"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { ArrowUpRight } from "lucide-react"
import { TextReveal } from "@/components/ui/TextReveal"
import { SectionMarker, TechTag, Crosshair } from "@/components/ui/TechnicalDecor"

/**
 * AboutPage Component
 * Redesigned with a "Creative Manual" aesthetic.
 * Now fully modular using the translation dictionary.
 */
export default function AboutPage() {
  const { t } = useLanguage()

  const sections = t.about.sections.map((section, index) => ({
    ...section,
    image: index === 0 ? "/creative-team-collaboration.png" : index === 1 ? "/design-brainstorming.jpg" : "/brand-strategy-meeting.png",
    coord: index === 0 ? "40.7128° N, 74.0060° W" : index === 1 ? "34.0522° N, 118.2437° W" : "51.5074° N, 0.1278° W"
  }))

  return (
    <main className="bg-white pt-32 pb-24 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Hero section */}
      <section className="relative z-10 py-24 mb-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <TechTag label="Foundation" value={t.about.hero.foundation} />
              <div className="h-[1px] flex-grow bg-neutral-100" />
              <TechTag label="Classification" value={t.about.hero.classification} />
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 text-6xl md:text-8xl lg:text-9xl font-a font-black leading-[0.85] tracking-tighter"
            >
              <span className="block">{t.about.hero.title1}</span>
              <span className="block text-neutral-300">{t.about.hero.title2}</span>
            </motion.h1>

            <div className="grid md:grid-cols-2 gap-12 items-end">
              <div className="font-c text-[10px] uppercase tracking-[0.2em] leading-relaxed text-neutral-500 max-w-sm">
                {t.about.hero.report}
                <br />
                {t.about.hero.reportText}
              </div>
              <div className="text-xl md:text-2xl font-b font-medium leading-relaxed">
                <TextReveal text={t.about.hero.reveal} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters / Sections */}
      <div className="relative z-10 space-y-48">
        {sections.map((section, index) => (
          <section 
            key={section.id} 
            id={section.id === "01" ? "we-create" : section.id === "02" ? "we-design" : "we-shape"}
            className="container mx-auto px-6 lg:px-8"
          >
            <SectionMarker number={section.id} title={section.title} />
            
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              {/* Left Column: Image & Technical Specs */}
              <div className="lg:col-span-5 space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
                >
                  <Image src={section.image || "/placeholder.svg"} alt={section.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4"><Crosshair /></div>
                  <div className="absolute bottom-4 right-4"><Crosshair /></div>
                </motion.div>

                <div className="flex justify-between border-t border-neutral-100 pt-8">
                  <TechTag label="Location Coordinates" value={section.coord} />
                  <TechTag label="Ref_Status" value="PROCESSED // OK" />
                </div>
              </div>

              {/* Right Column: Content & Reveal */}
              <div className="lg:col-span-7 lg:pl-12">
                <h3 className="text-3xl md:text-5xl font-a font-black mb-8 leading-tight uppercase tracking-tight">
                  {section.subtitle}
                </h3>
                
                <div className="text-lg md:text-2xl font-b text-neutral-600 mb-12">
                  <TextReveal text={section.description} />
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {section.categories.map((cat, i) => (
                    <div key={cat} className="flex items-center gap-3 py-3 border-b border-neutral-100">
                      <span className="font-c text-[10px] text-neutral-300">0{i+1}</span>
                      <span className="font-c text-[10px] uppercase tracking-wider font-bold">{cat}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  href="/what-we-do"
                  data-cursor-text="Learn More"
                  className="inline-flex mt-12 items-center gap-4 py-1 link-premium-arrow text-black font-c text-[10px] uppercase tracking-widest transition-colors"
                >
                  <span>{t.about.cta}</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Stats Section */}
      <section className="container mx-auto px-6 lg:px-8 mt-64 border-t-2 border-black pt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {t.about.stats.map((stat, i) => (
            <div key={i} className="space-y-4">
                <p className="font-c text-[9px] uppercase tracking-widest text-neutral-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-7xl font-a font-black">{stat.value}</span>
                  <span className="text-[10px] font-c uppercase font-bold opacity-30">{stat.sub}</span>
                </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
