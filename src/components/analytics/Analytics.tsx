import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConsentBanner from "@/components/analytics/ConsentBanner";
import WebVitals from "@/components/analytics/WebVitals";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";
import { site } from "@/content/site";

/**
 * Vercel Analytics y Speed Insights no usan cookies: cargan siempre.
 * GA4 (gtag.js) solo se descarga cuando el visitante acepta el aviso;
 * los eventos previos quedan en dataLayer y se envían al cargar.
 */
export default function Analytics() {
  const gaId = site.gaId;
  // Los scripts /_vercel/* solo existen desplegados en Vercel; en local darían 404.
  const onVercel = process.env.VERCEL === "1";
  return (
    <>
      {onVercel ? <VercelAnalytics /> : null}
      {onVercel ? <SpeedInsights /> : null}
      {gaId ? (
        <>
          <AnalyticsEvents />
          <WebVitals />
          <ConsentBanner gaId={gaId} />
        </>
      ) : null}
    </>
  );
}
