import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import WebVitals from "@/components/analytics/WebVitals";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";

/**
 * Vercel Analytics y Speed Insights no usan cookies: cargan siempre.
 * GA4 solo se carga si existe NEXT_PUBLIC_GA_ID y con Consent Mode v2
 * (denegado por defecto hasta que el visitante acepte).
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  // Los scripts /_vercel/* solo existen desplegados en Vercel; en local darían 404.
  const onVercel = process.env.VERCEL === "1";
  return (
    <>
      {onVercel ? <VercelAnalytics /> : null}
      {onVercel ? <SpeedInsights /> : null}
      {gaId ? (
        <>
          <GoogleAnalytics gaId={gaId} />
          <AnalyticsEvents />
          <WebVitals />
          <ConsentBanner />
        </>
      ) : null}
    </>
  );
}
