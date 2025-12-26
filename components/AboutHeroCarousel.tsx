"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// UPDATE: About Hero Carousel inspired by Yucca food-processing page
// Referencia: https://yucca.co.za/food-processing/ (hero carousel con CTA)
// Motivo: Replicar hero con carousel automático y CTA "Interested? Contact us"

interface CarouselSlide {
  id: number
  image: string
  title: string
  description: string
  label: string
}

interface AboutHeroCarouselProps {
  slides: CarouselSlide[]
  ctaText: string
  ctaLink?: string
}

export function AboutHeroCarousel({ slides, ctaText, ctaLink = "/contact" }: AboutHeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // UPDATE: Auto-advance carousel every 5 seconds
  // Inspired by Yucca's smooth automatic transitions
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] bg-black overflow-hidden">
      {/* Carousel Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].image || "/placeholder.svg"}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end">
        <div className="container mx-auto px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-4xl">
            {/* Slide Label */}
            <motion.div
              key={`label-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 font-c text-[10px] uppercase tracking-[0.3em] text-white">
                {slides[currentIndex].label}
              </span>
            </motion.div>

            {/* Slide Title */}
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-a font-black text-white mb-6 leading-tight"
            >
              {slides[currentIndex].title}
            </motion.h1>

            {/* Slide Description */}
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl font-b text-white/80 mb-8 max-w-2xl leading-relaxed"
            >
              {slides[currentIndex].description}
            </motion.p>

            {/* CTA Button - Inspired by Yucca "Interested? Contact us" */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-c text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white border-2 border-white transition-all duration-300 group"
              >
                <span>{ctaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-16 md:bottom-24 right-6 lg:right-8 z-20 flex items-center gap-4">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter */}
        <div className="font-c text-[10px] uppercase tracking-wider text-white">
          <span className="font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-white/40 mx-2">/</span>
          <span className="text-white/60">{String(slides.length).padStart(2, "0")}</span>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-6 lg:left-8 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`w-12 md:w-16 h-1 transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/30 group-hover:bg-white/50"
              }`}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute top-0 left-0 h-1 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
