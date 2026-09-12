import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Inter_Tight } from "next/font/google";
import { site } from "@/content/site";
import { buildHomeGraph, absoluteUrl } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import Analytics from "@/components/analytics/Analytics";
import retrato from "@/assets/img/andrea-belalcazar-retrato.jpg";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f5f5f7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Comunicación política",
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  verification: { google: "gIM0v2i00yNmjc_jssnPoK93URB4449vWmz1DxKs25E" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "profile",
    locale: site.ogLocale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    firstName: "Andrea",
    lastName: "Belalcázar",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.locale} className={`${inter.variable} ${interTight.variable}`} data-scroll-behavior="smooth">
      <body>
        {site.gaId ? (
          // Consent Mode v2: denegado por defecto antes de que cargue GA (solo permitido en el root layout)
          <Script id="consent-default" strategy="beforeInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
          </Script>
        ) : null}
        <SkipLink />
        <JsonLd data={buildHomeGraph(absoluteUrl(retrato.src))} />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
