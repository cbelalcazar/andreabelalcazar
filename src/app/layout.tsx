import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Andrea Belalcázar | Estratega de Comunicación y Analista Política",
  description: "Consultoría estratégica de alto nivel en comunicación política, gestión de crisis y posicionamiento institucional en Colombia. Arquitecta de narrativas de poder.",
  keywords: ["Andrea Belalcázar", "Estratega Política", "Analista Política", "Comunicación Política Colombia", "Gestión de Crisis", "Marketing Político", "Valle del Cauca", "Cali"],
  authors: [{ name: "Andrea Belalcázar" }],
  creator: "Andrea Belalcázar",
  metadataBase: new URL("https://www.andreabelalcazar.com"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.andreabelalcazar.com",
    title: "Andrea Belalcázar | Estratega de Comunicación y Analista Política",
    description: "Liderando la comunicación estratégica y el análisis político con rigor técnico y visión de vanguardia.",
    siteName: "Andrea Belalcázar Portfolio",
    images: [
      {
        url: "/portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Andrea Belalcázar - Estratega Política",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrea Belalcázar | Estratega Política",
    description: "Arquitecta de narrativas institucionales y analista de poder.",
    images: ["/portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-slate-300 bg-[#0A0A0B]`}
      >
        {children}
      </body>
    </html>
  );
}
