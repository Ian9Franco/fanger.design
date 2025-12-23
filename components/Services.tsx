"use client"

// Sección de servicios
// Grid de servicios ofrecidos con títulos y descripciones

import { useLanguage } from "@/hooks/use-language"
import { AnimatedSection } from "./AnimatedSection"
import { motion } from "framer-motion"

export function Services() {
  const { t } = useLanguage()

  return (
    <AnimatedSection className="container mx-auto px-6 py-24 lg:px-8 lg:py-32">
      {/* Título de sección */}
      <h2 className="mb-16 text-balance text-4xl font-bold md:text-5xl lg:text-6xl">{t.services.title}</h2>

      {/* Grid de servicios */}
      <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
        {t.services.items.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="border-t border-border pt-6"
          >
            <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
            <p className="text-pretty text-muted-foreground">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  )
}
