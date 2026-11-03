// design-sync shim for `next/image` (aliased in .design-sync/build-pkg.mjs).
// Outside Next there is no image optimizer and no `public/` mount, so render a
// plain <img> and resolve root-relative paths against the production site,
// which serves the same `public/` tree.
import type { CSSProperties, ImgHTMLAttributes } from "react";

export const ASSET_ORIGIN = "https://buzzards-soft.com";

type StaticImport = { src: string; width?: number; height?: number };

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | StaticImport;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  priority?: boolean;
  quality?: number | `${number}`;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  loader?: unknown;
};

export function resolveAssetSrc(src: string | StaticImport): string {
  const raw = typeof src === "string" ? src : src.src;
  return raw.startsWith("/") && !raw.startsWith("//") ? ASSET_ORIGIN + raw : raw;
}

export default function Image({
  src,
  alt,
  fill,
  priority,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  loader: _loader,
  style,
  ...rest
}: ImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : undefined;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={resolveAssetSrc(src)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{ ...fillStyle, ...style }}
    />
  );
}
