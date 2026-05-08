import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and any path with a file extension
  // (favicon, og-default.png, robots.txt, sitemap.xml, fonts, assets, …).
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
