import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Cursor } from "@/components/Cursor"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Fanger | An Earned-Led Culture Agency",
  description:
    "We create and amplify the world's most-talked about brands, destinations and experiences. An independently owned earned-led culture agency.",
  generator: "fanger.design",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`font-sans antialiased [&:not(.touch)]:cursor-none`}>
        <SmoothScrollProvider>
          {/* Cursor personalizado global */}
          <Cursor />

          {/* Header fijo en todas las páginas */}
          <Header />

          {/* Contenido principal */}
          <main className="page-transition">{children}</main>

          {/* Footer en todas las páginas */}
          <Footer />

          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
