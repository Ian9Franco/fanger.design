"use client"

import Image from "next/image"
import { useLanguage } from "@/hooks/use-language"
import { clients } from "@/data/clients"
import { motion } from "framer-motion"

export function Clients() {
  const { lang } = useLanguage()

  return (
    <section className="py-32 lg:py-40 bg-neutral-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header alineado a la izquierda en móvil */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-left md:text-center"
        >
          <h2 className="text-3xl font-normal md:text-4xl lg:text-5xl max-w-4xl leading-tight mx-auto">
            {lang === "en"
              ? "Proudly behind the most renowned luxury and lifestyle brands and places"
              : "Orgullosamente detrás de las marcas y lugares de lujo y estilo de vida más reconocidos"}
          </h2>
        </motion.div>

        {/* Grid con esquinas decorativas tipo weareexample */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Esquinas decorativas - exactas como weareexample */}
          <svg
            className="absolute -left-2 -top-2 h-6 w-6 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M0 0 L0 24 M0 0 L24 0" />
          </svg>
          <svg
            className="absolute -right-2 -top-2 h-6 w-6 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M24 0 L24 24 M24 0 L0 0" />
          </svg>
          <svg
            className="absolute -bottom-2 -left-2 h-6 w-6 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M0 24 L0 0 M0 24 L24 24" />
          </svg>
          <svg
            className="absolute -bottom-2 -right-2 h-6 w-6 text-black"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M24 24 L24 0 M24 24 L0 24" />
          </svg>

          {/* Grid de logos */}
          <div className="grid grid-cols-2 gap-10 border-2 border-black p-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-16 lg:p-20 bg-white">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.06, 
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex items-center justify-center grayscale transition-all duration-500 hover:grayscale-0 hover:scale-110"
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="h-auto w-full max-w-[120px] object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
