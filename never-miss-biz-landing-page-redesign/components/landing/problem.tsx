"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOff, DollarSign, Clock, VoicemailIcon } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: PhoneOff,
    value: "62%",
    label: "of calls missed",
    description: "While you're on the job",
  },
  {
    icon: DollarSign,
    value: "$1,200",
    label: "average job value",
    description: "Lost to competitors",
  },
  {
    icon: Clock,
    value: "5 min",
    label: "to lose a lead",
    description: "They call someone else",
  },
  {
    icon: VoicemailIcon,
    value: "85%",
    label: "won't leave voicemail",
    description: "They just move on",
  },
];

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" ref={ref} className="relative py-32 overflow-hidden bg-[#09090b]">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-px bg-[#D4AF37]" />
          <span className="text-sm text-muted-foreground uppercase tracking-wider">The Problem</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl"
        >
          Every unanswered call is money{" "}
          <span className="text-[#D4AF37]">walking to your competitor.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mb-20"
        >
          <p className="mb-4">
            {"You're on the roof, under the sink, or inside an electrical panel. You can't answer every call. But your customers won't wait."}
          </p>
          <Link 
            href="#roi-calculator" 
            className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors font-medium"
          >
            {"See how much you're losing →"}
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-[#09090b] p-8 group hover:bg-[#0f0f11] transition-colors"
            >
              <stat.icon className="w-6 h-6 text-[#D4AF37] mb-6" />
              <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
