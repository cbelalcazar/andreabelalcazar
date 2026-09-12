import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Andrea Belalcázar, estratega de comunicación política";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [fontData, imageData] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/PlayfairDisplay-Bold.ttf")),
    readFile(join(process.cwd(), "src/assets/img/andrea-belalcazar-retrato-og.jpg")),
  ]);

  const imageBase64 = imageData.toString("base64");
  const imageSrc = `data:image/jpeg;base64,${imageBase64}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "#0A0A0B",
        color: "#ffffff",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
        <div
          style={{
            fontFamily: "Playfair",
            fontSize: "72px",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Andrea Belalcázar
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#d4af37",
          }}
        >
          Estrategia de prensa y comunicación política · Cali
        </div>
      </div>
      <div style={{ display: "flex", borderRadius: "10px", overflow: "hidden", border: "2px solid #333" }}>
        <img src={imageSrc} alt="" width={350} height={466} style={{ objectFit: "cover" }} />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Playfair",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
