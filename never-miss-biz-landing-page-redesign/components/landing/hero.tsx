"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroParticles } from "./hero-particles";
import { HeroPhone3D } from "./hero-phone-3d";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

const TRADES = [
  "Plumbers",
  "HVAC Companies",
  "Electricians",
  "Roofers",
  "Drain & Sewer",
  "Pest Control",
  "Landscapers",
  "Contractors",
  "Business Owners",
];

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [tradeIndex, setTradeIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTradeIndex((prev) => (prev + 1) % TRADES.length);
        setFade(true);
      }, 500);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#09090b] pt-16 md:pt-32 pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating particles — slow-drifting signal blips */}
      <HeroParticles />

      {/* 3D phone centerpiece — tilts toward cursor, showcased in its own zone below the headline */}
      <HeroPhone3D />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-3 md:mb-4"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#D4AF37] text-glow mb-4 leading-tight">
            While You&apos;re On the Job,
            <br />
            We&apos;re Booking Your Next One.
          </h1>
        </motion.div>

        {/* Cycling Trade Text — inline, no box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4 md:mb-8"
        >
          <p className="text-xl md:text-2xl text-white/60 font-normal">
            Built for{" "}
            <span
              className="text-white font-semibold"
              style={{
                opacity: fade ? 1 : 0,
                transition: "opacity 0.5s ease",
                display: "inline-block",
                minWidth: "180px",
                textAlign: "left",
              }}
            >
              {TRADES[tradeIndex]}
            </span>
          </p>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-5 md:mb-10 text-balance"
        >
          Responds to every unanswered call. Qualifies the lead, books the
          appointment, and protects your revenue. Automatically.
        </motion.p>

        {/* CTA Button — single, wide, pulsating gold-glow border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-2 md:mb-4"
        >
          <Button
            size="lg"
            className="cta-glow-pulse bg-[#09090b] border border-[#D4AF37] text-white hover:bg-[#D4AF37]/10 rounded-full px-12 md:px-16 py-6 text-base md:text-lg font-semibold tracking-wide group"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Demo
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>

        {/* Reserved space for the 3D phone showcase below — the phone itself
            renders via the full-bleed HeroPhone3D canvas, this just reserves
            the vertical room so it has its own clear zone, not overlapping text */}
        <div className="h-[230px] md:h-[440px]" aria-hidden="true" />

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
    </section>
  );
}
