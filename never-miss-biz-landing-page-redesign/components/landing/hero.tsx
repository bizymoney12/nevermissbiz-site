"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-4"
        >
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            While You&apos;re On the Job,
            <br />
            <span className="text-[#D4AF37] text-glow">
              We&apos;re Booking Your Next One.
            </span>
          </h1>
        </motion.div>

        {/* Cycling Trade Text — inline, no box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
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
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-10 text-balance"
        >
          Responds to every unanswered call. Qualifies the lead, books the
          appointment, and protects your revenue. Automatically.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            className="bg-[#D4AF37] text-[#09090b] hover:bg-[#D4AF37]/90 rounded-full px-8 py-6 text-base font-medium group"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              See It In Action
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-[#09090b] border-border text-foreground hover:bg-[#171717] rounded-full px-8 py-6 text-base"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: "0", label: "Leads Lost After Hours" },
            { value: "24/7", label: "Always On — Day & Night" },
            { value: "100%", label: "Calls Captured" },
            { value: "48hr", label: "Setup Time" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#09090b] border-t-2 border-[#D4AF37] rounded-xl p-6 md:p-8 flex flex-col items-center text-center"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
    </section>
  );
}
