"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/2D03AJHPVtlSaiidxOrw";

const navLinks = [
  { name: "The Problem", href: "#problem" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090b]/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span style={{ color: '#D4AF37', fontWeight: 800, fontSize: '20px', letterSpacing: '0.04em', fontFamily: 'inherit' }}>AI</span>
            <div style={{ width: '1px', height: '18px', background: 'rgba(212,175,55,0.4)' }} />
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '13px', letterSpacing: '0.14em', fontFamily: 'inherit' }}>NEVERMISSBIZ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              size="sm"
              className="bg-[#D4AF37] text-[#09090b] hover:bg-[#D4AF37]/90 rounded-full px-5 font-medium"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Schedule a Call
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-white text-[#09090b] hover:bg-white/90 rounded-full px-5 font-medium"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#09090b]/95 backdrop-blur-xl border-b border-border"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button 
                className="w-full bg-[#D4AF37] text-[#09090b] hover:bg-[#D4AF37]/90 rounded-full font-medium"
                asChild
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </a>
              </Button>
              <Button 
                className="w-full bg-white text-[#09090b] hover:bg-white/90 rounded-full font-medium"
                asChild
              >
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
