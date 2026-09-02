import { HomeSections } from "@/components/home-sections";
import { ShowcaseHero } from "@/components/showcase-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AlternativeHomePage() {
  return <><SiteHeader /><main><ShowcaseHero /><HomeSections /></main><SiteFooter /></>;
}
