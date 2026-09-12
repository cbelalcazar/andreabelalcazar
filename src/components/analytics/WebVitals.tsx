"use client"; // useReportWebVitals requiere cliente

import { useReportWebVitals } from "next/web-vitals";
import { sendGAEvent } from "@next/third-parties/google";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    try {
      sendGAEvent("event", "web_vitals", {
        metric: metric.name,
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        rating: metric.rating,
        metric_id: metric.id,
        non_interaction: true,
      });
    } catch {
      /* GA no disponible */
    }
  });
  return null;
}
