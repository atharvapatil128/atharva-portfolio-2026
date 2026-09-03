import { ClarityRunHero } from "@/components/clarity-run-hero";
import { HomeSections } from "@/components/home-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ClarityHomePage() {
  return (
    <>
      <div
        hidden
        data-surface-contract="THESIS: fuzzy product signals become a usable path; OWN-WORLD: Atharva's product practice is framed through an F1 clarity run; STORY: scattered inputs resolve into an ordered rail and a concrete outcome; FIRST VIEWPORT: direct junior-designer introduction beside one interactive transformation; FORM: code-led local homepage extension, seed f1-clarity-run-local-extension; FINISH: the route ships only after visual review, documentation, and provenance for every raster asset"
      />
      <SiteHeader />
      <main>
        <ClarityRunHero />
        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
