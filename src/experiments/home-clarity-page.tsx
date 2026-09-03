import { ClarityRunHero } from "@/components/clarity-run-hero";
import { HomeSections } from "@/components/home-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Archived homepage experiment. This intentionally lives outside `src/app` so
 * the concept remains available in source without creating a public route.
 */
export function HomeClarityExperiment() {
  return (
    <>
      <SiteHeader />
      <main>
        <ClarityRunHero />
        <HomeSections />
      </main>
      <SiteFooter />
    </>
  );
}
