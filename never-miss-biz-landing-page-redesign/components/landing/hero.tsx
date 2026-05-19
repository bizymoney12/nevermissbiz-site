"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      
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
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
            Never Miss
            <br />
            <span className="text-[#D4AF37] text-glow">Another Lead.</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8 text-balance"
        >
          Responds to every unanswered call. Qualifies the lead, books the appointment, and protects your revenue. Automatically.
        </motion.p>

        {/* Badge - moved above CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-[#09090b]/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered Lead Recovery</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
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

        {/* Stats Grid - Redesigned 2x2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: "$0", label: "Leads Lost After Hours" },
            { value: "NeverMissBiz", label: "24/7 Always On", isText: true },
            { value: <Check className="w-12 h-12 md:w-16 md:h-16" />, label: "Quick Response", isIcon: true },
            { value: "48hr", label: "Setup Time" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-[#09090b] border-t-2 border-[#D4AF37] rounded-xl p-6 md:p-8 flex flex-col items-center text-center"
            >
              <span className={`${stat.isText ? 'text-xl md:text-2xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold text-[#D4AF37] mb-2`}>
                {stat.isIcon ? stat.value : stat.value}
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
