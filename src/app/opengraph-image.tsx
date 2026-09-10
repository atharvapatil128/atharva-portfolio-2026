import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Atharva Patil — Product designer working from research through shipped interface";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const instrumentSansRegular = readFile(join(process.cwd(), "src/app/fonts/instrument-sans-regular.ttf"));
const instrumentSansSemiBold = readFile(join(process.cwd(), "src/app/fonts/instrument-sans-semibold.ttf"));

const signalDots = [
  [110, 72], [434, 31], [702, 21], [1028, 146], [1148, 324], [860, 492], [1180, 568],
];

function BrandSeal() {
  return (
    <div style={{ width: 184, height: 184, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 28, color: "#F6F7F4", background: "#111318", boxShadow: "0 26px 52px rgba(17,19,24,.18)", transform: "rotate(2deg)" }}>
      <svg width="116" height="116" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 24 12.2 8h4.1L9.2 24H5Z" fill="currentColor" />
        <path d="M15.2 8h5.6C25.3 8 28 10.5 28 14.4S25.2 21 20.6 21h-4.1l1.7-3.7h2.5c2 0 3.2-1 3.2-2.8 0-1.7-1.1-2.7-3.1-2.7h-7.2L15.2 8Z" fill="currentColor" />
        <circle cx="25.4" cy="24.1" r="2.1" fill="#FF5A18" />
      </svg>
    </div>
  );
}

export default async function Image() {
  const [regularData, semiBoldData] = await Promise.all([
    instrumentSansRegular,
    instrumentSansSemiBold,
  ]);

  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", overflow: "hidden", color: "#111318", background: "#F6F7F4", fontFamily: "Instrument Sans" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.72, backgroundImage: "radial-gradient(circle at center, #D4D8DE 1.5px, transparent 1.6px)", backgroundSize: "40px 42px" }} />
        {signalDots.map(([left, top]) => (
          <span key={`${left}-${top}`} style={{ position: "absolute", left, top, width: 4, height: 4, display: "flex", borderRadius: 999, background: "#FF5A18" }} />
        ))}

        <div style={{ position: "absolute", inset: 32, display: "flex", border: "1px solid #D4D8DE", borderRadius: 28, background: "rgba(246,247,244,.9)" }} />

        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "68px 76px 62px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 28, fontWeight: 600 }}>
              Atharva Patil
              <span style={{ width: 7, height: 7, display: "flex", marginLeft: 12, borderRadius: 999, background: "#FF5A18" }} />
            </div>
            <span style={{ color: "#616671", fontSize: 17, letterSpacing: ".04em" }}>PRODUCT DESIGNER</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 64 }}>
            <div style={{ width: 780, display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 600, lineHeight: 0.98, letterSpacing: "-.035em" }}>
              <span>AI takes me to a prototype fast.</span>
              <span style={{ marginTop: 10, display: "flex" }}>
                <span style={{ display: "flex", backgroundImage: "linear-gradient(transparent 78%, #FF5A18 78%, #FF5A18 91%, transparent 91%)" }}>Taste</span>
                <span>&nbsp;takes it all the way.</span>
              </span>
            </div>
            <BrandSeal />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#616671", fontSize: 22 }}>Research · interaction · prototyping · front-end</span>
            <span style={{ fontSize: 17, letterSpacing: ".02em" }}>atharvapatil.net</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Sans", data: regularData, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: semiBoldData, weight: 600, style: "normal" },
      ],
    },
  );
}
