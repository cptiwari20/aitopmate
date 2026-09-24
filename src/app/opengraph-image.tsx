import { ImageResponse } from "next/og";

export const alt = "TopAImate — the invite-only room for people building the AI era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 50% 0%, #3a2c16 0%, #0b0b0c 60%)",
          color: "#f3efe6",
        }}
      >
        <div style={{ fontSize: 30, color: "#d4a55a", letterSpacing: 6 }}>INVITE ONLY</div>
        <div style={{ fontSize: 84, lineHeight: 1.05, maxWidth: 950 }}>The room where AI&apos;s builders talk honestly.</div>
        <div style={{ fontSize: 34, color: "#a19d94" }}>TopAImate</div>
      </div>
    ),
    size,
  );
}
