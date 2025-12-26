"use client"

/**
 * Showcase Section (Made with Fanger)
 * Replicates the Osmo Community 'Made with Osmo' section.
 * Features: Grid of project cards, minimal typography, 'Resources Used' style tags, and smooth hover effects.
 */

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"
import { clients } from "@/data/clients"
import { ArrowUpRight } from "lucide-react"

export function FlippingLogos() {
  const { lang, t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  // Synthetic tags for the showcase to look like Osmo's "Resources Used"
  const getTags = (index: number) => {
    const tags = [
      ["Branding", "Strategy"],
      ["Web Design", "Development"],
      ["Art Direction", "Motion"],
      ["Campaign", "Social"],
      ["Identity", "Print"],
      ["Digital", "UX/UI"],
      ["Commerce", "Growth"],
      ["Content", "Video"]
    ]
    return tags[index % tags.length]
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4 block">
              {lang === "en" ? "Selected Work" : "Trabajos Seleccionados"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black">
              Made with Fanger
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <a href="/work" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-neutral-500 transition-colors">
              {lang === "en" ? "View All Projects" : "Ver Todos los Proyectos"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Card Image / Logo Area */}
              <div className="relative aspect-[4/3] bg-neutral-50 border border-neutral-100 mb-6 overflow-hidden rounded-sm transition-all duration-500 group-hover:shadow-lg group-hover:border-neutral-200">
                <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    width={160}
                    height={80}
                    className="w-full h-auto object-contain max-h-[60px] grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>

              {/* Card Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-black group-hover:text-neutral-600 transition-colors">
                  {client.name}
                </h3>
                
                {/* Tags mimicking 'Resources Used' */}
                <div className="flex flex-wrap gap-y-2 gap-x-4 pt-2 border-t border-dashed border-neutral-200">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block mb-1">
                      {lang === "en" ? "Services" : "Servicios"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {getTags(index).map((tag) => (
                        <span key={tag} className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full">
                          @{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
