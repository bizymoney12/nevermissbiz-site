"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const THOUGHTS = [
  "I missed a call last week and didn't even know until I lost the job.",
  "I'm under a sink all day — I physically can't answer my phone.",
  "I don't know how many calls I've missed. I just know it's happening.",
  "My phone rings, I'm on a roof, and that customer is just... gone.",
  "By the time I call back, they've already booked someone else.",
];

export function InnerMonologue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#09090b]">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12 justify-center"
        >
          <div className="w-12 h-px bg-[#D4AF37]" />
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Sound Familiar?
          </span>
          <div className="w-12 h-px bg-[#D4AF37]" />
        </motion.div>

        {/* Thoughts */}
        <div className="space-y-8 md:space-y-10">
          {THOUGHTS.map((thought, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className={`text-center text-balance leading-snug ${
                i === 0
                  ? "text-2xl md:text-3xl font-semibold text-white"
                  : "text-lg md:text-xl text-white/55"
              }`}
            >
              &ldquo;{thought}&rdquo;
            </motion.p>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-[#D4AF37] font-semibold text-lg md:text-xl mt-14"
        >
          We built NeverMissBiz so you never have to think that again.
        </motion.p>
      </div>
    </section>
  );
}
