"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[#09090b]">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span style={{ color: '#D4AF37', fontWeight: 800, fontSize: '20px', letterSpacing: '0.04em', fontFamily: 'inherit' }}>AI</span>
              <div style={{ width: '1px', height: '18px', background: 'rgba(212,175,55,0.4)' }} />
              <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '13px', letterSpacing: '0.14em', fontFamily: 'inherit' }}>NEVERMISSBIZ</span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-sm">
              AI-powered missed call recovery for local home service businesses. 
              Never lose another lead.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:+13106541061" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                (310) 654-1061
              </a>
              <a 
                href="mailto:mike@nevermissbiz.com" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                mike@nevermissbiz.com
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Kissimmee, FL
              </div>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 NeverMissBiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
