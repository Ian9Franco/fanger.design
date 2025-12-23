"use client"

/**
 * Hero con efecto parallax
 * - Background se mueve más lento que foreground
 * - Imágenes decorativas con diferentes velocidades
 * - Crea ilusión de profundidad en capas
 */

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

export function ParallaxHero() {
  const { t } = useLanguage()
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Diferentes velocidades para crear efecto parallax
  const backgroundY = scrollY * 0.5 // Se mueve más lento
  const midgroundY = scrollY * 0.3
  const foregroundY = scrollY * 0.1

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background Layer - se mueve más lento */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-30">
        <Image
          src="/creative-agency-workspace-collaboration.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </motion.div>

      {/* Midground - Imágenes decorativas con velocidad media */}
      <motion.div style={{ y: midgroundY }} className="absolute left-[10%] top-[20%] -z-20 opacity-30">
        <div className="h-32 w-32 rotate-12 overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/brand-strategy-planning-design-thinking.jpg"
            alt="Decoration"
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div style={{ y: midgroundY * 0.8 }} className="absolute right-[15%] top-[50%] -z-20 opacity-40">
        <div className="h-40 w-40 -rotate-6 overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/creative-team-brainstorming-modern-office.jpg"
            alt="Decoration"
            width={160}
            height={160}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div style={{ y: midgroundY * 1.2 }} className="absolute bottom-[30%] left-[20%] -z-20 opacity-20">
        <div className="h-24 w-24 rotate-6 overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/creative-agency-workspace-collaboration.jpg"
            alt="Decoration"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Foreground - Contenido principal */}
      <motion.div
        style={{ y: foregroundY }}
        className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-32 pb-24 lg:px-8"
      >
        <div className="container mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-xs font-medium uppercase tracking-widest text-white/80"
          >
            {t.hero.overline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-6xl font-black leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-9xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
