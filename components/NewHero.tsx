"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { TechTag, SectionMarker } from "@/components/ui/TechnicalDecor"
import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight } from "lucide-react"

export function NewHero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute top-24 right-0 p-10 z-20 hidden lg:block">
        <TechTag label="Protocol" value="FNG_CORE_V1" />
      </div>

      <section className="min-h-screen flex items-center justify-center bg-background pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionMarker number="00" title="INITIALIZATION" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative space-y-2"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-a font-black leading-[0.85] tracking-tight">
                    {t.hero.overline}
                  </h1>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative mt-2 sm:mt-4 group cursor-pointer flex-shrink-0"
                    whileHover={{ scale: 1.05, rotate: -12 }}
                  >
                    <div className="relative w-[18vw] sm:w-[15vw] lg:w-[10vw] aspect-[4/5] shadow-2xl">
                      <Image
                        src="/agency-team-working.jpg"
                        alt="Team photo 1"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 border-[4px] sm:border-[6px] lg:border-8 border-white pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-a font-black leading-[0.85] tracking-tight">
                  {t.hero.title.earned}
                </h1>

                <div className="flex items-start gap-4 md:gap-6">
                  <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-a font-black leading-[0.85] tracking-tight text-neutral-300">
                    {t.hero.title.culture}
                  </h1>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 6 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative mt-1 sm:mt-2 group cursor-pointer flex-shrink-0"
                    whileHover={{ scale: 1.05, rotate: 10 }}
                  >
                    <div className="relative w-[18vw] sm:w-[15vw] lg:w-[10vw] aspect-[4/5] shadow-2xl">
                      <Image
                        src="/agency-team-collaboration.jpg"
                        alt="Team photo 2"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 border-[4px] sm:border-[6px] lg:border-8 border-white pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7vw] font-a font-black leading-[0.85] tracking-tight">
                  {t.hero.title.agency}
                </h1>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="lg:col-span-4 flex flex-col justify-end pb-4"
            >
              <div className="mb-4 font-c text-[10px] uppercase tracking-widest opacity-30">
                [ OVERVIEW_MNL_V2 ]
              </div>
              <p className="font-b text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-md">
                {t.hero.subtitle}
              </p>
              <Link 
                href="#what-we-do"
                data-cursor-text="Explore"
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] link-premium-arrow transition-opacity font-c"
              >
                {t.hero.cta}
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-32">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden"
          >
            <motion.div
              style={{ y }}
              className="absolute inset-0 scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <Image
                src="/creative-workspace.png"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), opacity }}
              className="absolute inset-0 flex items-center justify-center text-center p-8 z-10"
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-4xl md:text-6xl lg:text-8xl font-a font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl"
                >
                  {t.hero.marquee}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="mt-6 flex flex-col items-center gap-2"
                >
                  <p className="text-xl md:text-2xl font-light text-white/90 tracking-wider font-c">
                    03 / 03
                  </p>
                  <div className="w-px h-12 bg-white/30" />
                </motion.div>
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-0" />
            
            <div className="absolute top-8 left-8 text-white/40 font-c text-[8px] uppercase tracking-[0.4em] z-20">
              [ REF_SYSTEM_3.0 ]
            </div>
            <div className="absolute top-8 right-8 text-white/40 font-c text-[8px] uppercase tracking-[0.4em] z-20">
              40.7128° N, 74.0060° W
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
