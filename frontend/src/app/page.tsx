import { PrimaryFooter } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Features } from "@/components/sections/home/features";
import { GlobalReach } from "@/components/sections/home/globalReach";
import { Hero } from "@/components/sections/home/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
    <Header />
    <Hero />
    <Features />
    <GlobalReach />
    <PrimaryFooter/>
  </main>
  );
}
