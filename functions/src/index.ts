import { onRequest, type Request } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import type { Response } from "express";
import { Resend } from "resend";
import { z } from "zod";

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

const FROM_ADDRESS = "Buzzards Soft <noreply@buzzards-soft.com>";
const TO_ADDRESS = "dev.buzzardssoft@gmail.com";

const ALLOWED_ORIGINS = new Set<string>([
  "https://buzzards-soft.com",
  "https://www.buzzards-soft.com",
  "https://buzzards-soft-web.web.app",
  "https://buzzards-soft-web.firebaseapp.com",
]);

const STAGING_ORIGIN_REGEX = /^https:\/\/buzzards-soft-web--[a-z0-9-]+\.web\.app$/;

const contactPayloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(160),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(4000),
  source: z.enum(["linkedin", "referral", "google", "other"]).optional(),
  // Honeypot — schema allows anything; we silently 200 if bot fills it.
  website: z.string().max(2000).optional(),
  locale: z.string().max(8).optional(),
});

type ContactPayload = z.infer<typeof contactPayloadSchema>;

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.has(origin) || STAGING_ORIGIN_REGEX.test(origin);
}

function setCors(res: Response, origin: string): void {
  res.set("Access-Control-Allow-Origin", origin);
  res.set("Vary", "Origin");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");
}

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]!.trim();
  }
  const real = req.headers["x-real-ip"];
  if (typeof real === "string") return real;
  return req.ip ?? "unknown";
}

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }
  if (bucket.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(payload: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "—"],
    ["Source", payload.source ?? "—"],
    ["Locale", payload.locale ?? "—"],
  ];
  const rowHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-family:monospace;font-size:12px;text-transform:uppercase;letter-spacing:0.08em">${k}</td><td style="padding:6px 12px;font-family:system-ui,sans-serif">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const message = escapeHtml(payload.message).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Nowa wiadomość z buzzards-soft.com</title>
</head>
<body style="margin:0;background:#f8fafc;font-family:system-ui,sans-serif;color:#0f172a">
  <div style="max-width:640px;margin:0 auto;padding:24px">
    <h1 style="margin:0 0 16px;font-size:18px">Nowa wiadomość z formularza buzzards-soft.com</h1>
    <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
      ${rowHtml}
    </table>
    <h2 style="margin:24px 0 8px;font-size:14px;color:#475569">Wiadomość</h2>
    <div style="padding:16px;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;line-height:1.6">${message}</div>
  </div>
</body></html>`;
}

function buildText(payload: ContactPayload): string {
  return [
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Source:  ${payload.source ?? "—"}`,
    `Locale:  ${payload.locale ?? "—"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export const contact = onRequest(
  {
    region: "europe-west1",
    secrets: [RESEND_API_KEY],
    cors: false,
    invoker: "public",
    maxInstances: 5,
    memory: "256MiB",
  },
  async (req, res): Promise<void> => {
    const origin = req.headers.origin;
    const allowed = isOriginAllowed(origin);

    if (req.method === "OPTIONS") {
      if (allowed && origin) setCors(res, origin);
      res.status(204).send("");
      return;
    }

    if (!allowed) {
      res.status(403).json({ ok: false, error: "origin_not_allowed" });
      return;
    }

    setCors(res, origin!);

    if (req.method !== "POST") {
      res.status(405).json({ ok: false, error: "method_not_allowed" });
      return;
    }

    const ip = getClientIp(req);
    const limit = rateLimit(ip);
    if (!limit.ok) {
      res.set("Retry-After", String(limit.retryAfter));
      res.status(429).json({ ok: false, error: "rate_limited" });
      return;
    }

    const parsed = contactPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      logger.warn("contact: validation failed", {
        ip,
        issues: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      });
      res.status(400).json({ ok: false, error: "invalid_payload" });
      return;
    }

    const payload = parsed.data;

    if (payload.website && payload.website.length > 0) {
      logger.info("contact: honeypot tripped", { ip });
      res.status(200).json({ ok: true });
      return;
    }

    try {
      const resend = new Resend(RESEND_API_KEY.value());
      const { data, error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        replyTo: payload.email,
        subject: `[Buzzards Soft] Nowa wiadomość: ${payload.name}`,
        html: buildHtml(payload),
        text: buildText(payload),
      });

      if (error) {
        logger.error("resend send error", { error });
        res.status(502).json({ ok: false, error: "send_failed" });
        return;
      }

      logger.info("contact sent", { ip, id: data?.id, source: payload.source });
      res.status(200).json({ ok: true });
    } catch (err) {
      logger.error("contact unexpected error", err);
      res.status(500).json({ ok: false, error: "internal" });
    }
  },
);
