"use client"

/**
 * Layout dividido con panel izquierdo fijo y derecho con scroll
 * - Lado izquierdo: sticky, permanece visible
 * - Lado derecho: scroll independiente con contenido
 * - Responsive: se apilan verticalmente en mobile
 */

import { motion } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

const contentSections = [
  {
    id: 1,
    title: "Brand Strategy",
    description: "We define your brand's unique position in the market",
    image: "/creative-agency-workspace-collaboration.jpg",
  },
  {
    id: 2,
    title: "Creative Campaigns",
    description: "We create culture-defining campaigns that earn attention",
    image: "/brand-strategy-planning-design-thinking.jpg",
  },
  {
    id: 3,
    title: "Digital Innovation",
    description: "We build digital experiences that connect and convert",
    image: "/creative-team-brainstorming-modern-office.jpg",
  },
  {
    id: 4,
    title: "Content Production",
    description: "We produce content that resonates with your audience",
    image: "/creative-agency-workspace-collaboration.jpg",
  },
]

export function SplitScrollLayout() {
  const { lang } = useLanguage()

  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel - Sticky */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
          <div className="flex h-full items-center justify-center bg-foreground p-8 text-background lg:p-16">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 text-xs font-medium uppercase tracking-widest opacity-80"
              >
                {lang === "en" ? "Our Approach" : "Nuestro Enfoque"}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6 text-5xl font-black leading-[0.9] tracking-tighter md:text-6xl lg:text-7xl"
              >
                {lang === "en" ? "We Make That Happen" : "Hacemos Que Suceda"}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed opacity-90"
              >
                {lang === "en"
                  ? "Through strategic thinking and creative execution, we transform brands into cultural leaders."
                  : "A través del pensamiento estratégico y la ejecución creativa, transformamos marcas en líderes culturales."}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right Panel - Scrolling Content */}
        <div className="lg:w-1/2">
          <div className="space-y-0">
            {contentSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative h-screen"
              >
                <div className="absolute inset-0">
                  <Image src={section.image || "/placeholder.svg"} alt={section.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 flex h-full items-end p-8 lg:p-16">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mb-4 text-4xl font-black text-white md:text-5xl">{section.title}</h3>
                    <p className="max-w-md text-lg text-white/90">{section.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
