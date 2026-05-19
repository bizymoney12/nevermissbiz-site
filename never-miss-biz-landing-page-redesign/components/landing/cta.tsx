"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="book-demo" ref={ref} className="relative py-32 overflow-hidden bg-[#09090b]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[150px] animate-pulse-glow" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to recover your first{" "}
            <span className="text-[#D4AF37] text-glow">missed job?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl">
            Setup takes 48-72 hours. No contracts. No tech work on your end. We handle everything.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#D4AF37] text-[#09090b] hover:bg-[#D4AF37]/90 rounded-full px-8 py-6 text-base font-medium group"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Get Protected
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-[#171717] border-border text-foreground hover:bg-[#171717]/80 rounded-full px-8 py-6 text-base"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-8">
            {"14-day free trial • No contracts • Cancel anytime"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
