"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

// UPDATE: Footer redesigned with Yucca-inspired layout and structure
// Referencia: https://yucca.co.za (footer structure, spacing, hierarchy)
// Motivo: Replicar diseño limpio y profesional con mejor organización de contenido

/**
 * SplitText component - Animates every character with stagger effect
 */
function SplitText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ")

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] overflow-hidden">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: (wordIndex * word.length + charIndex) * 0.02,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

/**
 * AnimatedLink - Hover effects for office links
 */
function AnimatedLink({ href, children, subtext }: { href: string; children: React.ReactNode; subtext?: string }) {
  return (
    <Link href={href} className="group relative block py-3 link-premium-arrow">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-xl sm:text-2xl md:text-3xl font-b font-bold transition-colors duration-300">
            {children}
          </div>
          {subtext && (
            <div className="text-[10px] md:text-xs font-c uppercase tracking-wider text-white/40 mt-1">{subtext}</div>
          )}
        </div>
        <div className="text-white/50">
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </Link>
  )
}

/**
 * Footer Component - Inspired by Yucca design
 * UPDATE: Simplified structure with cleaner sections and better visual hierarchy
 */
export function Footer() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <footer
      ref={containerRef}
      className="bg-black text-white relative overflow-visible selection:bg-white selection:text-black"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/80 z-10" />
        <img
          src="/abstract-creative-culture-agency-background.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16 lg:py-20"
      >
        {/* MAIN SECTION - Hero Text & Contact Info */}
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 mb-16 md:mb-20 lg:mb-24">
            {/* LEFT - Hero Text */}
            <div className="space-y-3 md:space-y-4">
              <p className="text-[9px] md:text-[10px] font-c uppercase tracking-[0.4em] text-white/40 mb-6">
                {t.footer.connect}
              </p>
              <h1 className="font-a font-bold leading-[0.9] tracking-tight text-white overflow-hidden">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl overflow-hidden">
                  <SplitText text={t.footer.title1} />
                </div>
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl overflow-hidden">
                  <SplitText text={t.footer.title2} />
                </div>
              </h1>
              <p className="text-base md:text-lg font-b text-white/60 leading-relaxed max-w-xl pt-6">
                {t.footer.tagline}
              </p>
            </div>

            {/* RIGHT - Office Locations */}
            <div className="space-y-6 md:space-y-8">
              <p className="text-[9px] md:text-[10px] font-c uppercase tracking-[0.4em] text-white/40">
                {t.footer.offices}
              </p>
              <div className="space-y-1">
                <AnimatedLink href="mailto:ar@fanger.design" subtext="Buenos Aires, Argentina">
                  AR_LATAM
                </AnimatedLink>
                <AnimatedLink href="mailto:es@fanger.design" subtext="Madrid, España">
                  EU_IBERIA
                </AnimatedLink>
                <AnimatedLink href="mailto:global@fanger.design" subtext="Remote First">
                  Global_OPS
                </AnimatedLink>
              </div>
            </div>
          </div>

          {/* SOCIAL & NEWSLETTER SECTION */}
          <div className="border-t border-white/10 pt-10 md:pt-12 pb-10 md:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-[9px] md:text-[10px] font-c uppercase tracking-[0.4em] text-white/40">Follow Us</p>
                <div className="flex flex-wrap gap-6 md:gap-8">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-b text-sm md:text-base uppercase tracking-wider text-white/60 hover:text-white transition-colors relative group"
                  >
                    <span className="relative">
                      Instagram
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-b text-sm md:text-base uppercase tracking-wider text-white/60 hover:text-white transition-colors relative group"
                  >
                    <span className="relative">
                      LinkedIn
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-b text-sm md:text-base uppercase tracking-wider text-white/60 hover:text-white transition-colors relative group"
                  >
                    <span className="relative">
                      Twitter
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Newsletter Form */}
              <div className="space-y-4">
                <p className="text-[9px] md:text-[10px] font-c uppercase tracking-[0.4em] text-white/40">
                  {t.footer.newsletter}
                </p>
                <form className="flex items-center gap-4 group">
                  <input
                    type="email"
                    placeholder={t.footer.placeholder}
                    className="flex-1 bg-transparent border-b border-white/30 py-3 text-base md:text-lg font-b text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 flex-shrink-0 hover-arrow"
                    aria-label="Subscribe"
                  >
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION - Legal & Credits */}
          <div className="border-t border-white/5 pt-8 text-[9px] md:text-[10px] font-c uppercase tracking-wider text-white/40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
              {/* Left - Copyright & Legal */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="relative w-24 h-6 mb-1 md:mb-0">
                  <Image
                    src="/logo/Logo-Fanger-Footer-black-V1.0-1.png"
                    alt="Fanger Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <span className="text-white/60 font-semibold">©2025 FANGER®</span>
                <Link href="#" className="hover:text-white transition-colors relative group">
                  <span className="relative">
                    {t.footer.privacy}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors relative group">
                  <span className="relative">
                    {t.footer.sustainability}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </div>

              {/* Right - Project Credits */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="font-d italic normal-case text-white/30 text-[9px]">{t.footer.project}</span>
                <Link
                  href="#"
                  className="font-semibold text-white/60 hover:text-white transition-colors relative group"
                >
                  <span className="relative">
                    {t.footer.design}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
                <span className="text-white/20">•</span>
                <Link
                  href="#"
                  className="font-semibold text-white/60 hover:text-white transition-colors relative group"
                >
                  <span className="relative">
                    {t.footer.dev}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Acknowledgement */}
          <div className="mt-12 text-[9px] md:text-[10px] font-c uppercase tracking-wide leading-relaxed text-white/30 max-w-2xl">
            {t.footer.acknowledgement}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
