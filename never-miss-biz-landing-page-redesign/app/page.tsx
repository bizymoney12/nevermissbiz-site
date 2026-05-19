import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { ROICalculator } from "@/components/landing/roi-calculator";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b]">
      <Header />
      <Hero />
      <ROICalculator />
      <Problem />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
