"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

export function ROICalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [jobValue, setJobValue] = useState(800);
  const [missedCalls, setMissedCalls] = useState(5);
  const [closeRate, setCloseRate] = useState(40);

  const monthlyLoss = Math.round((missedCalls * 4.33) * (closeRate / 100) * jobValue);
  const roi = Math.round(monthlyLoss / 297);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="roi-calculator" ref={ref} className="relative py-32 overflow-hidden bg-[#09090b]">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-[#D4AF37]" />
          <span className="text-sm text-muted-foreground uppercase tracking-wider">ROI Calculator</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16"
        >
          How much are you{" "}
          <span className="text-[#D4AF37]">losing?</span>
        </motion.h2>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#09090b] border border-border rounded-2xl p-8 md:p-12"
        >
          {/* Sliders */}
          <div className="space-y-10 mb-12">
            {/* Average Job Value */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-foreground font-medium">Average job value</label>
                <span className="text-2xl font-bold text-[#D4AF37]">{formatCurrency(jobValue)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer slider-gold"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$100</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Missed Calls Per Week */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-foreground font-medium">Missed calls per week</label>
                <span className="text-2xl font-bold text-[#D4AF37]">{missedCalls}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer slider-gold"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            {/* Close Rate */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-foreground font-medium">Your close rate</label>
                <span className="text-2xl font-bold text-[#D4AF37]">{closeRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer slider-gold"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>10%</span>
                <span>90%</span>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="text-center border-t border-border pt-10">
            <p className="text-lg text-muted-foreground mb-4">{"You're leaving"}</p>
            <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#D4AF37] mb-4">
              {formatCurrency(monthlyLoss)}
            </p>
            <p className="text-lg text-muted-foreground mb-6">on the table every month</p>
            
            <p className="text-muted-foreground mb-8">
              Book a free 15-minute call to see what we can recover for you. <span className="text-[#D4AF37] font-semibold">Your potential ROI: {roi}x</span>
            </p>

            <Button 
              size="lg" 
              className="bg-[#D4AF37] text-[#09090b] hover:bg-[#D4AF37]/90 rounded-full px-8 py-6 text-base font-medium group"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Recover My {formatCurrency(monthlyLoss)}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
