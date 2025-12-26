"use client"

import { motion, useScroll, useTransform, BezierDefinition } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight } from "lucide-react"

export function NewHero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress for the pinned section
  // Increased height to allow more scroll duration for the effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Animation values based on scroll
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 0.6], ["2rem", "0rem"])
  const cardWidth = useTransform(scrollYProgress, [0, 0.6], ["80%", "100%"])
  const cardHeight = useTransform(scrollYProgress, [0, 0.6], ["70vh", "100vh"])
  
  // Content Reveal (happens after card expansion)
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const textY = useTransform(scrollYProgress, [0.4, 0.6], [50, 0])

  // Parallax for the restored bottom section image
  const sectionRef = useRef(null)
  const { scrollYProgress: bottomSectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const bottomImageY = useTransform(bottomSectionProgress, [0, 1], ["-25%", "25%"])

  // Easing curve constant to fix TS error
  const customEase: BezierDefinition = [0.22, 1, 0.36, 1]

  // Letter animation variants
  const letterVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        duration: 0.8,
        ease: customEase,
        delay: i * 0.05,
      },
    }),
  }

  const titleChars = "fanger".split("")

  return (
    <div className="relative bg-white text-black">
      
      {/* 
        STICKY SCROLL HERO SECTION 
        Height is 250vh to allow for scroll distance (pinned effect)
      */}
      <div ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Transforming Card Container */}
          <motion.div 
            style={{ 
              scale, 
              borderRadius,
              width: cardWidth,
              height: cardHeight
            }}
            className="relative bg-[#F3F3F3] overflow-hidden shadow-2xl border border-black/5 origin-center"
          >
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />

             {/* SVG Decoration */}
             <motion.div 
                style={{ opacity: contentOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none text-black/5"
              >
                 <svg width="90%" height="90%" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="94.7523" height="94.7523" rx="47.3762" fill="currentColor" />
                  <path d="M45.6076 48.9678H22.8529V45.6666H45.6076L45.4897 21.8508H49.2625L49.1446 45.6666H71.8993V48.9678H49.1446L49.2625 72.9015H45.4897L45.6076 48.9678Z" fill="white" />
                </svg>
             </motion.div>

             {/* Content Layer */}
             <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 lg:p-24 z-10">
                {/* Top Bar */}
                <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-neutral-500">
                  <div className="flex flex-col gap-1">
                    <span className="text-black font-bold">Chapter 01</span>
                    <span>Values</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                     <span>Scroll to Explore</span>
                     <span className="text-black font-bold animate-bounce">↓</span>
                  </div>
                </div>

                {/* Center Content - Title */}
                <div className="flex flex-col items-center justify-center w-full">
                   <motion.div 
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: customEase }}
                    className="relative w-[70%] max-w-5xl aspect-[4/1] flex items-center justify-center"
                   >
                      <Image 
                        src="/logo/Logo-Fanger-Footer-black-V1.0-1.png" 
                        alt="Fanger Logo" 
                        fill
                        className="object-contain brightness-0"
                        priority
                      />
                   </motion.div>
                  
                  {/* Agency Description - Reveals on Scroll */}
                  <motion.div 
                    style={{ opacity: contentOpacity, y: textY }}
                    className="mt-8 text-center max-w-2xl"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Strategic Design & Marketing</h2>
                    <p className="text-lg text-neutral-600 mb-8">We engineer digital solutions that combine aesthetic excellence with measurable performance metrics.</p>
                    <Link 
                      href="#what-we-do"
                      className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest bg-black text-white px-8 py-3 rounded-full hover:bg-neutral-800 transition-colors"
                    >
                      View Projects <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-end font-mono text-xs uppercase tracking-widest text-neutral-500">
                    <div className="text-black/30 text-xl font-bold">{"</>"}</div>
                    <div>EST. 2023</div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* 
        RESTORED PREVIOUS SECTION 
        Large Creative Image + Marquee
      */}
      <section ref={sectionRef} className="relative px-6 py-32 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEase }}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden"
          >
            {/* Parallax Image */}
            <motion.div
              style={{ y: bottomImageY }}
              className="absolute inset-0 scale-[1.25] grayscale hover:grayscale-0 transition-all duration-1000"
            >
              <Image
                src="/creative-workspace.png"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Overlay Text */}
            <motion.div
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
                  CRAFTING DIGITAL <br/> EXPERIENCES
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

      {/* Marquee Foot */}
       <div className="border-t border-black/5 py-8 bg-neutral-50/50 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap">
           {[...Array(4)].map((_, i) => (
             <motion.div 
               key={i}
               initial={{ x: "0%" }}
               animate={{ x: "-100%" }}
               transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
               className="flex gap-8 items-center flex-shrink-0"
             >
                <span className="text-4xl md:text-6xl font-black text-black/5 tracking-tighter">
                   STRATEGY • DESIGN • CULTURE • GROWTH •
                </span>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  )
}
