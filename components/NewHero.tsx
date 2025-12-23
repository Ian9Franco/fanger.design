"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export function NewHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Scroll animation for the large image section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section with Text and Polaroid Images */}
      <section className="min-h-screen flex items-center justify-center bg-background pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Grid Layout: Text (left) + Description (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main text with integrated polaroid images - Left side */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative space-y-2"
              >
                {/* First line with first image INLINE */}
                <div className="flex items-start gap-4 md:gap-6">
                  <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-black leading-[0.85] tracking-tight">
                    AN
                  </h1>
                  {/* First polaroid image inline */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative mt-2 sm:mt-4 group cursor-pointer flex-shrink-0"
                    whileHover={{ scale: 1.05, rotate: -12 }}
                  >
                    <div className="relative w-[18vw] sm:w-[15vw] lg:w-[10vw] aspect-[4/5] shadow-2xl">
                      <Image
                        src="/placeholder-img.png"
                        alt="Team photo 1"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 border-[4px] sm:border-[6px] lg:border-8 border-white pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* Second line */}
                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-black leading-[0.85] tracking-tight">
                  EARNED-LED
                </h1>

                {/* Third line with second image INLINE */}
                <div className="flex items-start gap-4 md:gap-6">
                  <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-black leading-[0.85] tracking-tight">
                    CULTURE
                  </h1>
                  {/* Second polaroid image inline */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative mt-1 sm:mt-2 group cursor-pointer flex-shrink-0"
                    whileHover={{ scale: 1.05, rotate: 10 }}
                  >
                    <div className="relative w-[18vw] sm:w-[15vw] lg:w-[10vw] aspect-[4/5] shadow-2xl">
                      <Image
                        src="/placeholder-img.png"
                        alt="Team photo 2"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 border-[4px] sm:border-[6px] lg:border-8 border-white pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* Fourth line */}
                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-black leading-[0.85] tracking-tight">
                  AGENCY
                </h1>
              </motion.div>
            </div>

            {/* Description on the RIGHT side */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="lg:col-span-4 flex flex-col justify-end pb-4"
            >
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-md">
                In a world overloaded with noise, brands don't win by chasing attention—they earn it.
              </p>
              <Link 
                href="#what-we-do"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                <span className="inline-block transition-transform group-hover:translate-x-2">↳</span>
                WHAT WE DO
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Large Rounded Image Section with Parallax Text */}
      <section className="relative px-6 pb-32">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden"
          >
            {/* Background Image */}
            <motion.div
              style={{ y }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src="/placeholder-img.png"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Overlay Text that moves with scroll */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), opacity }}
              className="absolute inset-0 flex items-center justify-center text-center p-8"
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl"
                >
                  BUILDING LUXURY
                  <br />
                  CONSUMER BRANDS
                  <br />
                  THAT SHAPE TASTE
                  <br />
                  AND INFLUENCE
                  <br />
                  CULTURE.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-6 text-xl md:text-2xl font-light text-white/90 tracking-wider"
                >
                  03/03
                </motion.p>
              </div>
            </motion.div>

            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
