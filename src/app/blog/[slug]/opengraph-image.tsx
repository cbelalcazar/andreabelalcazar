import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPost, getPosts, TEMAS } from "@/lib/content";

export const alt = "Artículo de Andrea Belalcázar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const title = p?.title ?? "Andrea Belalcázar";
  const tema = p ? TEMAS[p.tema] : "Blog";
  const font = await readFile(join(process.cwd(), "src/assets/fonts/InterTight-SemiBold.ttf"));
  const fontSize = title.length > 70 ? 52 : title.length > 50 ? 60 : 68;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px",
        backgroundColor: "#0A0A0B",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          color: "#F5A623",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#9a5b00" }} />
        {tema}
      </div>
      <div
        style={{
          fontFamily: "InterTight",
          fontSize,
          lineHeight: 1.05,
          fontWeight: 600,
          letterSpacing: -2,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          color: "#5f5f64",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#1d1d1f", fontFamily: "InterTight", fontSize: 30 }}>Andrea Belalcázar</span>
          <span>Estrategia de prensa y comunicación política · Cali</span>
        </div>
        <span>andreabelalcazar.com</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "InterTight", data: font, weight: 600, style: "normal" }] },
  );
}
