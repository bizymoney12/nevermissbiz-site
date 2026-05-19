"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

const plans = [
  {
    name: "Starter",
    tagline: "Your Defense",
    price: "$297",
    setup: "$500",
    description: "Never lose another lead",
    features: [
      "Instant lead response system",
      "Intelligent SMS conversations",
      "Automated appointment booking & no-show reduction",
      "Monthly performance report",
      "14-day free trial",
    ],
    cta: "Get Protected",
    popular: false,
    ctaStyle: "dark",
  },
  {
    name: "Growth",
    tagline: "Your Offense",
    price: "$497",
    setup: "$800",
    description: "For growing businesses ready to scale",
    features: [
      "Starter +",
      "Reputation growth system",
      "Rank higher on Google",
      "Get found. Get called. Get hired.",
      "Automated lead pursuit",
    ],
    cta: "Start My Offense",
    popular: true,
    ctaStyle: "gold",
  },
  {
    name: "Full System",
    tagline: "Your Complete Playbook",
    price: "$997",
    setup: "$1,500",
    description: "For businesses ready to dominate their market",
    features: [
      "Growth +",
      "Voice AI — calls answered 24/7",
      "Your website gets a smart upgrade — visitors can speak directly with your AI",
      "Complete virtual front desk — answers calls, texts leads, books jobs, and builds your reputation. Automatically.",
      "Local SEO optimization",
    ],
    cta: "Go All In",
    popular: false,
    ctaStyle: "dark",
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden bg-[#09090b]">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-[#D4AF37]" />
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Pricing</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 max-w-4xl"
        >
          Simple pricing.{" "}
          <span className="text-[#D4AF37]">Serious ROI.</span>
        </motion.h2>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 z-10">
                  <span className="bg-[#D4AF37] text-[#09090b] text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className={`bg-[#09090b] border rounded-2xl p-8 h-full flex flex-col ${
                plan.popular ? "border-[#D4AF37]" : "border-border"
              }`}>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground uppercase">{plan.name}</h3>
                  <span className="text-xs text-[#D4AF37] uppercase tracking-[0.1em] font-medium">
                    {plan.tagline}
                  </span>
                  <p className="text-sm text-muted-foreground mt-3">{plan.description}</p>
                </div>
                
                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.setup} one-time setup
                  </p>
                </div>
                
                {/* Features - Plain text, no bullets */}
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <p key={feature} className="text-sm text-foreground leading-relaxed">
                      {feature}
                    </p>
                  ))}
                </div>
                
                {/* CTA */}
                <Button 
                  className={`w-full rounded-full font-medium ${
                    plan.ctaStyle === "gold"
                      ? "bg-[#D4AF37] text-[#09090b] hover:bg-[#D4AF37]/90" 
                      : "bg-[#171717] text-foreground hover:bg-[#171717]/80 border border-border"
                  }`}
                  size="lg"
                  asChild
                >
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground mt-12"
        >
          No contracts. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
