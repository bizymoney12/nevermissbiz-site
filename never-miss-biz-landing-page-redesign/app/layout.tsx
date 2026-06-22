\import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: 'NeverMissBiz | Never Miss Another Lead',
  description: 'AI-powered missed call recovery service for local home service businesses. Plumbers, HVAC, electricians in Kissimmee, FL. Turn missed calls into booked jobs.',
  openGraph: {
    title: 'NeverMissBiz | Never Miss Another Lead',
    description: 'AI-powered missed call recovery for local home service businesses. Plumbers, HVAC, electricians in Kissimmee, FL.',
    url: 'https://nevermissbiz.com',
    siteName: 'NeverMissBiz',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary',
    title: 'NeverMissBiz | Never Miss Another Lead',
    description: 'AI-powered missed call recovery for local home service businesses.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#09090b]">
      <body className="font-sans antialiased bg-[#09090b]">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZN86RPH217"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZN86RPH217');
          `}
        </Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script 
          src="https://beta.leadconnectorhq.com/loader.js" 
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js" 
          data-widget-id="6a04f1ab0d644482cc7169f2"
        />
      </body>
    </html>
  )
}
