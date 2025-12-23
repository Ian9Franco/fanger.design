"use client"

// Inspirado en la galería de proyectos de weareexample.com

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export function WorkShowcase() {
  const { lang } = useLanguage()

  const projects = [
    {
      title: "InterContinental Hayman Great Barrier Reef",
      description:
        lang === "en"
          ? "We're shaping the next chapter for InterContinental Hayman, story, strategy, and setting."
          : "Damos forma al próximo capítulo de InterContinental Hayman, historia, estrategia y ambiente.",
      image: "/placeholder-img.png",
      tag: "Coming Soon",
    },
    {
      title: "Addmind Dubai Harbour",
      description:
        lang === "en"
          ? "We are defining the strategy for Addmind's new Dubai Harbour F&B precinct."
          : "Definimos la estrategia para el nuevo distrito de F&B de Addmind en Dubai Harbour.",
      image: "/placeholder-img.png",
      tag: "Coming Soon",
    },
    {
      title: "The StandardX, Australia",
      description:
        lang === "en"
          ? "We introduced The Standard to Australia and gave Fitzroy a new cultural hotspot."
          : "Introducimos The Standard a Australia y dimos a Fitzroy un nuevo punto cultural.",
      image: "/placeholder-img.png",
      tag: "Coming Soon",
    },
    {
      title: "PATRÓN TEQUILA x SOLE DXB",
      description:
        lang === "en"
          ? "Leading the experiential concept and PR strategy for Patrón at Dubai's biggest culture festival."
          : "Liderando el concepto experiencial y estrategia de PR para Patrón en el festival cultural más grande de Dubai.",
      image: "/placeholder-img.png",
      tag: "Coming Soon",
    },
  ]

  return (
    <section className="py-32 lg:py-40">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header con título animado */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            {lang === "en" ? "We are Agency" : "Somos Agency"}
          </p>
          <h2 className="mb-8 text-6xl font-black leading-[0.9] md:text-7xl lg:text-8xl tracking-tighter">
            {lang === "en" ? "We Make It Happen" : "Lo Hacemos Realidad"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {lang === "en"
              ? "We create and amplify the world's most talked-about brands, destinations + experiences"
              : "Creamos y amplificamos las marcas, destinos y experiencias más comentadas del mundo"}
          </p>
        </motion.div>

        {/* Grid de proyectos */}
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-pointer"
            >
              <Link href="#" className="block">
                {/* Imagen */}
                <div className="relative mb-8 aspect-[3/4] overflow-hidden hover-zoom-image">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {project.tag && (
                    <div className="absolute right-4 top-4 bg-background/90 backdrop-blur-sm px-5 py-2 text-xs font-bold uppercase tracking-[0.2em]">
                      {project.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                </div>

                {/* Contenido */}
                <h3 className="mb-4 text-3xl font-black leading-tight transition-opacity group-hover:opacity-70">
                  {project.title}
                </h3>
                <p className="text-pretty text-base leading-relaxed text-muted-foreground">{project.description}</p>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA al final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 text-center"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-bold uppercase tracking-[0.3em] transition-all hover:border-muted-foreground hover:text-muted-foreground"
          >
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
            {lang === "en" ? "All Work" : "Ver Todos"}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
