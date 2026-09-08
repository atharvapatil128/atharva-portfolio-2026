import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./field-maintenance.css";

const instrumentSans = localFont({
  src: "./fonts/instrument-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: "./fonts/ibm-plex-mono-latin-500.woff2",
  weight: "500",
  variable: "--font-mono",
  display: "swap",
});

const defaultDescription =
  "Atharva Patil is a product designer with a background in HCI and computer science who works across research, prototyping, testing, and front-end implementation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://atharvapatil.net"),
  title: {
    default: "Atharva Patil — Product Designer",
    template: "%s — Atharva Patil",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Atharva Patil",
    title: "Atharva Patil — Product Designer",
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Patil — Product Designer",
    description: defaultDescription,
  },
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
        {children}
      </body>
    </html>
  );
}
