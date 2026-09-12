import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(join(process.cwd(), "src/assets/fonts/PlayfairDisplay-Bold.ttf"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0B",
        color: "#F5A623",
        fontFamily: "Playfair",
        fontSize: 92,
        fontWeight: 700,
        letterSpacing: -4,
      }}
    >
      AB
    </div>,
    { ...size, fonts: [{ name: "Playfair", data: font, weight: 700, style: "normal" }] },
  );
}
