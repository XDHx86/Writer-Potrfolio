"use client";

import { useEffect } from "react";
import { init } from "@plausible-analytics/tracker";

let initialized = false;

export function PlausibleAnalytics({ domain }: { domain: string }) {
  useEffect(() => {
    if (initialized) return;

    init({ domain, autoCapturePageviews: true });
    initialized = true;
  }, [domain]);

  return null;
}
