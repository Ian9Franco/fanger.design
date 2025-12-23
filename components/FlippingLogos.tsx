"use client"

/**
 * Grid de logos que rotan en 3D al hacer hover o scroll
 * - Cada logo tiene dos caras (front y back)
 * - Usa transform-style: preserve-3d para efecto 3D
 * - Se activa con hover y al entrar en viewport
 */

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"
import { clients } from "@/data/clients"

export function FlippingLogos() {
  const { lang } = useLanguage()
  const [flippedIndexes, setFlippedIndexes] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Flip all logos when section comes into view with stagger
            clients.forEach((_, index) => {
              setTimeout(() => {
                setFlippedIndexes((prev) => new Set(prev).add(index))
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {lang === "en" ? "Trusted by Industry Leaders" : "Confiado por Líderes de la Industria"}
          </h2>
        </motion.div>

        {/* Grid de logos con efecto flip 3D */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="flip-card group perspective-1000 h-40"
              onMouseEnter={() => setFlippedIndexes((prev) => new Set(prev).add(index))}
              onMouseLeave={() => {
                setFlippedIndexes((prev) => {
                  const newSet = new Set(prev)
                  newSet.delete(index)
                  return newSet
                })
              }}
            >
              <motion.div
                className="flip-card-inner relative h-full w-full transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedIndexes.has(index) ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front Face */}
                <div
                  className="flip-card-face absolute flex h-full w-full items-center justify-center border border-border bg-background p-8"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    width={140}
                    height={70}
                    className="h-auto w-full max-w-[140px] object-contain grayscale transition-all group-hover:grayscale-0"
                  />
                </div>

                {/* Back Face */}
                <div
                  className="flip-card-face absolute flex h-full w-full flex-col items-center justify-center border border-border bg-foreground p-8 text-background"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-center text-sm font-bold uppercase tracking-wider">{client.name}</p>
                  <p className="mt-2 text-center text-xs opacity-80">
                    {lang === "en" ? "Trusted Partner" : "Socio de Confianza"}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  )
}
