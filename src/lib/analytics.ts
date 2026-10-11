"use client";

import { track } from "@vercel/analytics";

type Events = {
  navigation_click: { section: string };
  project_open: { project: string; category: string };
  project_close: { project: string };
  project_pdf_view: { project: string; document: string };
  project_pdf_download: { project: string; document: string };
  project_pdf_external_open: { project: string; document: string };
  project_filter_change: { category: string };
  skill_category_select: { category: string };
  experience_expand: { role: string };
  contact_cta_click: { location: string };
  contact_form_start: { field: string };
  contact_form_validation_error: { count: number };
  contact_form_submit_attempt: Record<string, never>;
  contact_form_submit_success: Record<string, never>;
  contact_form_submit_failure: { reason: string };
};

export function recordEvent<K extends keyof Events>(name: K, data: Events[K]): void {
  try {
    track(name, data);
  } catch {
    // Analytics must never interrupt an interaction.
  }
}
