import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
