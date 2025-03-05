import { PrimaryFooter } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Features } from "@/components/sections/home/features";
import { HowItWorks } from "@/components/sections/home/howItWorks";
import { FloatingCTA } from "@/components/sections/home/floating-cta";
import { GlobalReach } from "@/components/sections/home/globalReach";
import { Hero } from "@/components/sections/home/hero";
import { NAV_ITEMS } from "@/constant/app.const";
import { Pricing } from "@/components/sections/home/pricing";
import { Blog } from "@/components/sections/home/blog";
import { FAQ } from "@/components/sections/home/faq";
export default function Home() {
  return (
    <main className="relative overflow-hidden font-public-sans">
    <Header navItems={NAV_ITEMS} className="bg-background/80 backdrop-blur-md"  />
    <FloatingCTA />
    <Hero />
    <Features />
    <HowItWorks />
    <Pricing />
    <Blog />
    <FAQ />
    <PrimaryFooter/>
  </main>
  );
}
