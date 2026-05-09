import { forwardRef, type ComponentProps } from "react";

import { IntlLink } from "./routing";

type IntlLinkProps = ComponentProps<typeof IntlLink>;

// Default `prefetch={false}` on every internal link.
// Next.js 16's segment-cache prefetch URLs use dot separators (e.g.
// `/pl/__next.$d$locale.__PAGE__.txt`) but `output: 'export'` writes the
// payloads to slash-separated paths (`/pl/__next.$d$locale/__PAGE__.txt`),
// so prefetches 404 on plain static hosts like Firebase Hosting. Disabling
// prefetch keeps the console clean; full HTML navigation still works.
export const Link = forwardRef<HTMLAnchorElement, IntlLinkProps>(
  function Link({ prefetch, ...props }, ref) {
    return <IntlLink ref={ref} prefetch={prefetch ?? false} {...props} />;
  },
);
