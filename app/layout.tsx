import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Instrument_Serif, Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimationProvider } from '@/components/layout/animation-provider';
import { CustomCursor } from '@/components/ui/cursor';
import { Preloader } from '@/components/ui/Preloader';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Fanger | An Earned-Led Culture Agency",
  description:
    "We create and amplify the world's most-talked about brands, destinations and experiences. An independently owned earned-led culture agency.",
  generator: "fanger.design",
  icons: {
    icon: [
      {
        url: "/logo/logo-n.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo/logo-b.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/logo/logo-n.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${montserrat.variable} font-sans antialiased text-black bg-white`}
        suppressHydrationWarning
      >
        <Preloader />
        <AnimationProvider>
          <CustomCursor />
          <Header />
          <main className="page-transition min-h-screen bg-white relative z-10">
            {children}
          </main>
          <Footer />
          <Analytics />
        </AnimationProvider>
      </body>
    </html>
  )
}
