import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | NeverMissBiz",
  description: "Privacy Policy for NeverMissBiz - AI-powered missed call recovery service for local home service businesses.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#09090b] pt-24">
        {/* Grid pattern background */}
        <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-20">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy <span className="text-[#D4AF37]">Policy</span>
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: May 11, 2026</p>

          {/* Content */}
          <div className="space-y-8 text-foreground">
            <p className="text-lg leading-relaxed">
              NeverMissBiz operates the website https://nevermissbiz.com. This Privacy Policy explains how we collect, use, and protect your information.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Information We Collect</h2>
              <p className="leading-relaxed text-muted-foreground">
                When you interact with our website chat widget, fill out a contact form, or call our business, we may collect your name, phone number, email address, and the nature of your inquiry.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">How We Use Your Information</h2>
              <p className="leading-relaxed text-muted-foreground">
                We use your information to respond to inquiries, deliver our services, send appointment reminders and follow-up messages, and send occasional promotional offers related to our services. You may opt out at any time by replying STOP to any text message.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">SMS / Text Messaging</h2>
              <p className="leading-relaxed text-muted-foreground">
                By providing your phone number, you consent to receive text messages from NeverMissBiz. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to unsubscribe or HELP for help.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Information Sharing</h2>
              <p className="leading-relaxed text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We do not buy or sell leads.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Data Security</h2>
              <p className="leading-relaxed text-muted-foreground">
                We take reasonable precautions to protect your information from unauthorized access or disclosure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Your Rights</h2>
              <p className="leading-relaxed text-muted-foreground">
                You may request to access, correct, or delete your personal information at any time by contacting us at mike@nevermissbiz.com.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Contact Us</h2>
              <div className="text-muted-foreground space-y-1">
                <p>NeverMissBiz</p>
                <p>Kissimmee, FL</p>
                <p>(310) 654-1061</p>
                <a 
                  href="mailto:mike@nevermissbiz.com" 
                  className="text-[#D4AF37] hover:underline"
                >
                  mike@nevermissbiz.com
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
