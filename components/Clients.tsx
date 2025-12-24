"use client"

import { useState } from "react"
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"
import { clients } from "@/data/clients"
import Image from "next/image"

/**
 * Redesigned Clients Section inspired by chipsa.design
 * Now using modular translations.
 */
export function Clients() {
  const { t } = useLanguage()
  const [hoveredClient, setHoveredClient] = useState<string | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - 150)
    mouseY.set(e.clientY - 150)
  }

  return (
    <section 
      className="py-40 bg-[#f2f2f2] relative overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <p className="font-c text-[10px] uppercase tracking-[0.4em] mb-4 text-neutral-400">
            {t.clients.log}
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-a font-black tracking-tighter uppercase">
            {t.clients.title}
          </h2>
        </motion.div>

        <div className="flex flex-col items-center">
          {clients.map((client) => (
            <motion.div
              key={client.name}
              onMouseEnter={() => setHoveredClient(client.name)}
              onMouseLeave={() => setHoveredClient(null)}
              className="group relative w-full py-8 md:py-12 border-b border-neutral-300 flex justify-center cursor-none"
            >
              <h3 className={`text-4xl md:text-7xl lg:text-9xl font-a font-black transition-all duration-500 uppercase tracking-tighter
                ${hoveredClient === client.name ? 'text-black opacity-100' : 'text-neutral-300 opacity-50'}`}
              >
                {client.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {hoveredClient && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ 
              position: 'fixed',
              left: x,
              top: y,
              pointerEvents: 'none',
              zIndex: 50
            }}
            className="w-[300px] h-[300px] flex items-center justify-center p-8 bg-white rounded-full shadow-2xl border border-neutral-100"
          >
            <div className="relative w-full h-full">
               <Image
                src={clients.find(c => c.name === hoveredClient)?.logo || "/placeholder.svg"}
                alt={hoveredClient}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
