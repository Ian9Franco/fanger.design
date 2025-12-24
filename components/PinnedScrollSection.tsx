"use client"

// Componente inspirado en weareexample.com - Sección con scroll donde el lado izquierdo permanece fijo mientras el derecho se desplaza
// Este es el efecto "sticky scroll" donde el título se mantiene visible mientras las imágenes/contenido desplaza verticalmente

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

export function PinnedScrollSection() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  // Configurar el scroll progress para esta sección
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Transformar el scroll en movimiento para las imágenes con más variación
  const image1Y = useTransform(scrollYProgress, [0, 0.3], [0, -150])
  const image1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0.7])
  
  const image2Y = useTransform(scrollYProgress, [0.2, 0.6], [100, -120])
  const image2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.55, 0.6], [0, 1, 1, 0.7])
  
  const image3Y = useTransform(scrollYProgress, [0.5, 1], [150, -50])
  const image3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 1], [0, 1, 1])

  const content = {
    en: {
      overline: "Capturing attention is hard.",
      subtitle: "Keeping it is even harder.",
      title1: "We Make",
      title2: "that happen",
      description:
        "The brands that win today are experienced, remembered and talked about. They don't pay or borrow for attention. They craft culture-defining moments and world-class destinations to earn loyalty, trust and connection that can last a lifetime.",
    },
    es: {
      overline: "Capturar la atención es difícil.",
      subtitle: "Mantenerla es aún más difícil.",
      title1: "Lo Hacemos",
      title2: "Realidad",
      description:
        "Las marcas que ganan hoy son experimentadas, recordadas y comentadas. No pagan ni piden prestada la atención. Crean momentos que definen la cultura y destinos de clase mundial para ganarse la lealtad, confianza y conexión que puede durar toda la vida.",
    },
  }

  const t = content[lang as keyof typeof content] || content.en

  return (
    <section ref={containerRef} className="relative bg-background min-h-[200vh]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* LADO IZQUIERDO - STICKY (permanece fijo durante el scroll) */}
          <div className="relative lg:sticky lg:top-32 lg:h-screen lg:py-32">
            <div className="flex h-full flex-col justify-center">
              {/* Overline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground"
              >
                {t.overline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 text-sm font-bold uppercase tracking-[0.3em]"
              >
                {t.subtitle}
              </motion.p>

              {/* Título masivo */}
              <motion.h2
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16 text-balance text-6xl font-black leading-[0.88] tracking-tighter md:text-7xl lg:text-8xl"
              >
                {t.title1}
                <br />
                <span className="relative inline-flex items-center gap-4">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    className="inline-block h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 animate-parallax-float"
                  >
                    <path d="M40 5L50 30L75 40L50 50L40 75L30 50L5 40L30 30L40 5Z" fill="currentColor" />
                  </svg>
                  {t.title2}
                </span>
              </motion.h2>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-lg text-lg leading-relaxed text-muted-foreground"
              >
                {t.description}
              </motion.p>
            </div>
          </div>

          {/* LADO DERECHO - SCROLLING (se desplaza normalmente) */}
          <div className="relative space-y-40 py-32 lg:py-64">
            {/* Imagen 1 */}
            <motion.div 
              style={{ y: image1Y, opacity: image1Opacity }} 
              className="relative aspect-[4/5] overflow-hidden rounded-lg hover-zoom-image"
            >
              <Image
                src="/agency-team-working.jpg"
                alt="Agency workspace"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Imagen 2 */}
            <motion.div 
              style={{ y: image2Y, opacity: image2Opacity }} 
              className="relative aspect-[4/5] overflow-hidden rounded-lg hover-zoom-image"
            >
              <Image
                src="/brand-strategy-planning-design-thinking.jpg"
                alt="Strategy planning"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Imagen 3 */}
            <motion.div 
              style={{ y: image3Y, opacity: image3Opacity }} 
              className="relative aspect-[4/5] overflow-hidden rounded-lg hover-zoom-image"
            >
              <Image
                src="/creative-team-brainstorming-modern-office.jpg"
                alt="Team brainstorming"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
