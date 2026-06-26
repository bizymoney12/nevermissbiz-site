"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOff, MessageSquare, CalendarCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneOff,
    title: "A call goes unanswered",
    description: "You're on a job, driving, or it's after hours. The call goes unanswered — and most customers won't wait around.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Our system responds. Instantly.",
    description: "Before they dial your competitor, our system reaches out — professionally, personally, and on your behalf. The conversation starts without you lifting a finger.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Job gets booked. You just show up.",
    description: "Our system qualifies the lead, gathers the details, and locks in the appointment directly to your calendar. Revenue protected.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 overflow-hidden bg-[#09090b]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />
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
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Process</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl"
        >
          From missed call to{" "}
          <span className="text-[#D4AF37]">booked job.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mb-20"
        >
          {"Our system handles everything after the missed call. No follow-up needed on your end."}
        </motion.p>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mb-20">
          {/* Signal path connecting the 3 steps — draws itself on scroll */}
          <svg
            className="absolute left-0 right-0 top-12 w-full h-6 pointer-events-none hidden md:block z-10"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 16.66 5 L 50 5 L 83.33 5"
              stroke="#D4AF37"
              strokeWidth="0.6"
              fill="none"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
            />
            {[16.66, 50, 83.33].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy={5}
                r={1.4}
                fill="#D4AF37"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.45 }}
              />
            ))}
          </svg>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
              className="bg-[#09090b] p-8 relative group"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-6xl font-bold text-border group-hover:text-[#D4AF37]/20 transition-colors">
                  {step.number}
                </span>
                <step.icon className="w-8 h-8 text-[#D4AF37]" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
