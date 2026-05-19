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
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mb-20">
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

        {/* iPhone iMessage Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-sm mx-auto"
        >
          {/* iPhone Frame */}
          <div className="bg-[#1c1c1e] rounded-[3rem] p-3 shadow-2xl">
            {/* Inner Screen */}
            <div className="bg-[#000000] rounded-[2.5rem] overflow-hidden">
              {/* Status Bar */}
              <div className="bg-[#000000] px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-white text-sm font-medium">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white/50 rounded-full" />
                  </div>
                  <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
                  </svg>
                  <svg className="w-6 h-3 text-white ml-1" fill="currentColor" viewBox="0 0 24 12">
                    <rect x="0" y="0" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <rect x="2" y="2" width="14" height="8" rx="1" fill="currentColor"/>
                    <rect x="21" y="3" width="2" height="6" rx="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Messages Header */}
              <div className="bg-[#1c1c1e] px-4 py-3 flex items-center justify-between border-b border-[#38383a]">
                <div className="text-[#0a84ff] text-sm">{"<"}</div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#3a3a3c] rounded-full flex items-center justify-center mb-1">
                    <span className="text-white text-sm font-medium">YB</span>
                  </div>
                  <span className="text-white text-sm font-medium">[Your Business]</span>
                </div>
                <div className="w-6" />
              </div>

              {/* Messages Area */}
              <div className="bg-[#000000] p-4 min-h-[320px]">
                <div className="space-y-3">
                  {/* AI Message - Grey bubble, left aligned */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[240px]">
                      <p className="text-white text-[15px]">
                        {"Hey, sorry we missed your call! This is [Your Business]. How can we help you today?"}
                      </p>
                    </div>
                  </div>
                  
                  {/* Customer Response - iMessage Blue, right aligned */}
                  <div className="flex justify-end">
                    <div className="bg-[#1984FC] rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[240px]">
                      <p className="text-white text-[15px]">
                        Hi! I have a leaking faucet. Can someone come out today?
                      </p>
                    </div>
                  </div>
                  
                  {/* AI Response - Grey bubble */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[240px]">
                      <p className="text-white text-[15px]">
                        Absolutely! We have 2pm or 4pm available. Which works better?
                      </p>
                    </div>
                  </div>

                  {/* Customer Response */}
                  <div className="flex justify-end">
                    <div className="bg-[#1984FC] rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[240px]">
                      <p className="text-white text-[15px]">
                        {"4pm works great!"}
                      </p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[240px]">
                      <p className="text-white text-[15px]">
                        {"Perfect! You're booked for 4pm. We'll see you then!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Bar */}
              <div className="bg-[#1c1c1e] px-4 py-3 flex items-center gap-3">
                <div className="flex-1 bg-[#3a3a3c] rounded-full px-4 py-2">
                  <span className="text-[#8e8e93] text-sm">iMessage</span>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="bg-[#000000] px-4 pb-2 pt-2 flex justify-center">
                <div className="w-32 h-1 bg-white rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Result line below phone */}
          <div className="mt-6 text-center">
            <span className="text-lg font-semibold text-[#D4AF37]">Job Booked. Automatically.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
