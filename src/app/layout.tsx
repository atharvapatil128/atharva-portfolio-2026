import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { SignalCursor } from "@/components/signal-cursor";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atharvapatil.net"),
  title: {
    default: "Atharva Patil — Product Designer",
    template: "%s — Atharva Patil",
  },
  description:
    "Product designer and AI-native builder turning complex consumer and enterprise systems into clear, dependable experiences.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#F6F7F4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <div
          hidden
          data-design-contract="THESIS: evidence-led clarity over portfolio spectacle. OWN-WORLD: porcelain canvas, soft-black ink, cobalt structure, orange decisions, precise rounded fields. STORY: understand Atharva, scan the work, choose depth. FIRST VIEWPORT: identity and action left; draggable complexity-to-clarity system right. FORM: approved Precision Paddock / Cobalt Circuit comp. SEED: cobalt-clarity-stack-40-125. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance"
        />
        <SignalCursor />
        {children}
      </body>
    </html>
  );
}
