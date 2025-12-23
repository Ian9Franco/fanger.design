"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useLanguage } from "@/hooks/use-language"

export function WorkCategories() {
  const { lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  const categories = [
    {
      number: "01",
      total: "03",
      title: lang === "en" ? "ISLANDS, RESTAURANTS & DESTINATIONS" : "ISLAS, RESTAURANTES Y DESTINOS",
      description:
        lang === "en"
          ? "Creating islands, restaurants, pubs and mixed use property - from concept design to launch and beyond."
          : "Creando islas, restaurantes, pubs y propiedades de uso mixto - desde el diseño conceptual hasta el lanzamiento.",
      image: "/placeholder-img.png",
    },
    {
      number: "02",
      total: "03",
      title: lang === "en" ? "TRAVEL AND HOTELS" : "VIAJES Y HOTELES",
      description:
        lang === "en"
          ? "Elevating tourism, reimagining hotels and shaping destinations worth travelling for."
          : "Elevando el turismo, reimaginando hoteles y formando destinos que valen la pena visitar.",
      image: "/placeholder-img.png",
    },
    {
      number: "03",
      total: "03",
      title: lang === "en" ? "LUXURY CONSUMER BRANDS" : "MARCAS DE LUJO",
      description:
        lang === "en"
          ? "Building luxury consumer brands that shape taste and influence culture."
          : "Construyendo marcas de lujo que definen el gusto e influencian la cultura.",
      image: "/placeholder-img.png",
    },
  ]

  return (
    <section ref={containerRef} className="py-32 lg:py-40">
      <div className="space-y-56">
        {categories.map((category, index) => (
          <motion.div
            key={category.number}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Background marquee text - enhanced speed */}
            <div className="absolute inset-0 -z-10 flex items-center overflow-hidden opacity-[0.03] pointer-events-none">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                  <h2 key={i} className="pr-16 text-[10rem] font-black uppercase">
                    {category.title}
                  </h2>
                ))}
              </div>
            </div>

            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={index % 2 === 0 ? "" : "lg:order-2"}
                >
                  <p className="mb-6 font-mono text-sm text-muted-foreground tracking-wider">
                    {category.number} / {category.total}
                  </p>
                  <p className="mb-10 text-sm leading-relaxed text-muted-foreground max-w-md">
                    {category.description}
                  </p>
                  <h3 className="text-balance text-5xl font-black leading-[0.88] tracking-tighter lg:text-6xl xl:text-7xl">
                    {category.title}
                  </h3>
                </motion.div>

                {/* Image with enhanced hover effect */}
                <motion.div
                  initial={{ opacity: 0, x: 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative aspect-[4/3] overflow-hidden hover-zoom-image ${index % 2 === 0 ? "" : "lg:order-1"}`}
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-700" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
