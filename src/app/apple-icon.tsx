import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await readFile(join(process.cwd(), "src/assets/fonts/InterTight-SemiBold.ttf"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1d1d1f",
        color: "#ffffff",
        fontFamily: "InterTight",
        fontSize: 92,
        fontWeight: 600,
        letterSpacing: -6,
      }}
    >
      AB
    </div>,
    { ...size, fonts: [{ name: "InterTight", data: font, weight: 600, style: "normal" }] },
  );
}
