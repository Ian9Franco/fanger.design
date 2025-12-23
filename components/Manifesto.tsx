"use client"

// Inspirado en la sección "We Make That Happen" de fanger.design

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

export function Manifesto() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32 lg:py-48">
      {/* Background con imagen */}
      <div className="absolute inset-0 -z-10">
        <Image src="/abstract-creative-workspace.jpg" alt="Background" fill className="object-cover opacity-5" />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-xs font-medium uppercase tracking-widest text-muted-foreground"
        >
          {lang === "en" ? "Capturing attention is hard." : "Capturar la atención es difícil."}
        </motion.p>

        {/* Título masivo con parallax */}
        <motion.h2
          style={{ y }}
          className="mb-12 text-balance text-6xl font-black leading-[0.95] tracking-tighter md:text-8xl lg:text-9xl"
        >
          {lang === "en" ? (
            <>
              We Make{" "}
              <span className="relative inline-block">
                <Image
                  src="/agency-team-working.jpg"
                  alt="Team"
                  width={200}
                  height={200}
                  className="inline-block h-24 w-24 object-cover md:h-32 md:w-32 lg:h-40 lg:w-40"
                />
              </span>{" "}
              that happen
            </>
          ) : (
            <>
              Lo Hacemos{" "}
              <span className="relative inline-block">
                <Image
                  src="/agency-team-working.jpg"
                  alt="Team"
                  width={200}
                  height={200}
                  className="inline-block h-24 w-24 object-cover md:h-32 md:w-32 lg:h-40 lg:w-40"
                />
              </span>{" "}
              Realidad
            </>
          )}
        </motion.h2>

        {/* Descripción */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {lang === "en" ? "Keeping it is even harder." : "Mantenerla es aún más difícil."}
          </p>
          <p className="text-lg leading-relaxed md:text-xl">
            {lang === "en"
              ? "The brands that win today are experienced, remembered and talked about. They don't pay or borrow for attention. They craft culture-defining moments and world-class destinations to earn loyalty, trust and connection that can last a lifetime."
              : "Las marcas que ganan hoy son experimentadas, recordadas y comentadas. No pagan ni piden prestada la atención. Crean momentos que definen la cultura y destinos de clase mundial para ganarse la lealtad, confianza y conexión que puede durar toda la vida."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
