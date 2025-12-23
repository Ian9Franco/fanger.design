"use client"

/**
 * Efecto de footer reveal - el footer se revela detrás de la imagen hero
 * - Hero image es sticky y se mantiene fija
 * - Footer está debajo y se revela al scrollear
 * - Opcionalmente fade out de la imagen al acercarse al footer
 */

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Footer } from "@/components/Footer"

export function FooterReveal() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = -rect.top
      const height = rect.height - window.innerHeight
      const progress = Math.min(Math.max(scrolled / height, 0), 1)

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const imageOpacity = 1 - scrollProgress * 2 // Fade out más rápido

  return (
    <div ref={sectionRef} className="relative">
      {/* Sticky Hero Image */}
      <motion.div className="sticky top-0 z-10 h-screen w-full" style={{ opacity: Math.max(imageOpacity, 0) }}>
        <div className="relative h-full w-full">
          <Image src="/creative-agency-workspace-collaboration.jpg" alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-6xl font-black tracking-tighter md:text-8xl">Let's Create</h2>
              <p className="mt-4 text-xl">Scroll to reveal</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer que se revela debajo */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  )
}
