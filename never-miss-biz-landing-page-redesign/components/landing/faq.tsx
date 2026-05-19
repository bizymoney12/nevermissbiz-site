"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

const faqs = [
  {
    question: "How quickly does your system respond?",
    answer: "The moment a call goes unanswered, our system responds — day or night, weekends and holidays included. By the time your competitor's voicemail picks up, we've already started the conversation.",
  },
  {
    question: "Will customers know they're texting with an AI?",
    answer: "Our system is trained to sound natural and professional — like your best employee. Most customers never question it. You can customize the name, tone, and responses to match your brand perfectly.",
  },
  {
    question: "How does appointment booking work?",
    answer: "Our system qualifies the lead, collects their details, and offers available time slots from your calendar. Once confirmed, it's automatically added — you just show up.",
  },
  {
    question: "What if I want to take over a conversation?",
    answer: "You get instant notifications for every new lead. Jump in anytime through your dashboard and take over seamlessly — the system hands off without the customer noticing.",
  },
  {
    question: "Do I need to change my business phone number?",
    answer: "No. We set up a local number that works alongside your existing number. No disruption to how you currently operate.",
  },
  {
    question: "How long does setup take?",
    answer: "Most clients are fully up and running within 48-72 hours. We handle everything — you just answer a few questions about your business and we take it from there.",
  },
  {
    question: "Is there a contract?",
    answer: "No contracts, ever. Month-to-month only. Cancel anytime with no penalties.",
  },
  {
    question: "What trades businesses do you work with?",
    answer: "We specialize in local home service businesses — plumbers, HVAC technicians, electricians, roofers, landscapers, and pest control. If your phone rings and you can't always answer it, we're built for you.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-start justify-between text-left group"
      >
        <span className="text-lg font-medium text-foreground pr-8 group-hover:text-[#D4AF37] transition-colors">
          {question}
        </span>
        <div className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
          {isOpen ? (
            <Minus className="w-3 h-3 text-[#D4AF37]" />
          ) : (
            <Plus className="w-3 h-3 text-muted-foreground group-hover:text-[#D4AF37] transition-colors" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground leading-relaxed max-w-2xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="relative py-32 overflow-hidden bg-[#09090b]">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#D4AF37]" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider">FAQ</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Common{" "}
              <span className="text-[#D4AF37]">questions.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Everything you need to know about NeverMissBiz. Still have questions?{" "}
              <a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors"
              >
                Talk to us directly →
              </a>
            </p>
          </motion.div>
          
          {/* Right Column - FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
