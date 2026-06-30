import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Terms of Service | NeverMissBiz",
  description: "Terms of Service for NeverMissBiz - AI-powered missed call recovery service for local home service businesses.",
};

export default function TermsPage() {
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
            Terms of <span className="text-[#D4AF37]">Service</span>
          </h1>
          <p className="text-muted-foreground mb-12">Last updated: May 11, 2026</p>

          {/* Content */}
          <div className="space-y-8 text-foreground">
            <p className="text-lg leading-relaxed">
              By accessing https://nevermissbiz.com or using our services, you agree to these Terms of Service.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Our Services</h2>
              <p className="leading-relaxed text-muted-foreground">
                NeverMissBiz provides AI-powered missed call recovery and lead nurturing automation services for local home service businesses in Central Florida.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Service Agreement</h2>
              <p className="leading-relaxed text-muted-foreground">
                Services are provided month-to-month with no long-term contracts. A one-time setup fee is required to activate your account. Monthly fees begin after the 14-day free trial period. You may cancel at any time with no penalties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Payment</h2>
              <p className="leading-relaxed text-muted-foreground">
                Setup fees are non-refundable once onboarding has begun. Monthly subscription fees are billed in advance each billing cycle.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">SMS Communications</h2>
              <p className="leading-relaxed text-muted-foreground">
                By engaging with our services, you agree to receive SMS messages related to your account, service updates, and appointment follow-ups. You may opt out at any time by replying STOP.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Acceptable Use</h2>
              <p className="leading-relaxed text-muted-foreground">
                You agree not to use NeverMissBiz services for any unlawful purpose, to send spam, or to violate any applicable regulations including TCPA and CAN-SPAM.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Limitation of Liability</h2>
              <p className="leading-relaxed text-muted-foreground">
                NeverMissBiz is not liable for missed leads, lost revenue, or service interruptions beyond our control. Our total liability shall not exceed the amount paid in the most recent billing cycle.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Changes to Terms</h2>
              <p className="leading-relaxed text-muted-foreground">
                We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of updated terms.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-[#D4AF37]">Contact Us</h2>
              <div className="text-muted-foreground space-y-1">
                <p>NeverMissBiz</p>
                <p>Kissimmee, FL</p>
                <p>(407) 289-1406</p>
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
