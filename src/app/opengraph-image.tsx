import { ImageResponse } from "next/og";

export const alt = "Atharva Patil — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 96,
          background: "#F6F7F4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5A18", marginRight: 16, display: "flex" }} />
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 2, color: "#616671", textTransform: "uppercase" }}>
            Product Designer
          </span>
        </div>
        <span style={{ fontSize: 88, fontWeight: 700, color: "#111318", lineHeight: 1.06 }}>Atharva Patil</span>
        <span style={{ marginTop: 24, fontSize: 30, color: "#616671" }}>
          Evidence-led product design, from research to shipped interface.
        </span>
      </div>
    ),
    { ...size }
  );
}
