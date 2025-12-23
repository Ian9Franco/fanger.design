"use client"

/**
 * Hero Slider con cambio de slides basado en scroll
 * - Múltiples slides con imagen y texto
 * - Barra de progreso que se llena según el slide actual
 * - Cambia hacia adelante/atrás según dirección del scroll
 * - Transiciones suaves con opacity y transform
 */

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
}

export function HeroSlider() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const slides: Slide[] = [
    {
      id: 1,
      image: "/creative-agency-workspace-collaboration.jpg",
      title: t.hero.title,
      subtitle: t.hero.subtitle,
    },
    {
      id: 2,
      image: "/brand-strategy-planning-design-thinking.jpg",
      title: t.hero.title,
      subtitle: "We create culture-defining campaigns that earn attention",
    },
    {
      id: 3,
      image: "/creative-team-brainstorming-modern-office.jpg",
      title: t.hero.title,
      subtitle: "We don't buy attention. We earn it.",
    },
  ]

  const totalSlides = slides.length
  const progress = ((currentSlide + 1) / totalSlides) * 100

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return

      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2

      if (!inView) return

      // Detectar dirección del scroll
      const scrollingDown = e.deltaY > 0
      const scrollingUp = e.deltaY < 0

      if (scrollingDown && currentSlide < totalSlides - 1) {
        e.preventDefault()
        setIsScrolling(true)
        setCurrentSlide((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 800)
      } else if (scrollingUp && currentSlide > 0) {
        e.preventDefault()
        setIsScrolling(true)
        setCurrentSlide((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 800)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [currentSlide, isScrolling, totalSlides])

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center lg:px-8">
            <div className="container mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 text-6xl font-black leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-9xl"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl lg:text-2xl"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 lg:px-8">
        <div className="container mx-auto">
          {/* Slide Counter */}
          <div className="mb-2 flex justify-between text-xs font-medium text-white">
            <span>
              {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full overflow-hidden bg-white/20 backdrop-blur-sm">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator (solo visible en el primer slide) */}
      {currentSlide === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="h-6 w-[1px] bg-white/60"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
