import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#111318",
          borderRadius: 7,
        }}
      >
        <span style={{ color: "#F6F7F4", fontSize: 20, fontWeight: 700 }}>A</span>
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#FF5A18",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
