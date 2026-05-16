import type { ReactNode } from "react";

import { FEATURE_FLAGS, type FeatureFlags } from "@/lib/config/feature-flags";

export type FeatureGateProps = {
  flag: keyof FeatureFlags;
  children: ReactNode;
};

export function FeatureGate({ flag, children }: FeatureGateProps) {
  if (!FEATURE_FLAGS[flag]) return null;
  return <>{children}</>;
}
