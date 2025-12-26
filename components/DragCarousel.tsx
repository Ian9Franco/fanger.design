"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useLanguage } from "@/hooks/use-language"

// UPDATE: Drag Carousel Component inspired by Yucca About page
// Referencia: https://yucca.co.za/about/ ("The Journey of Yucca Packaging" carousel)
// Motivo: Replicar interacción drag con cursor personalizado y animación fluida

export function DragCarousel() {
  const { t } = useLanguage()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })

  // UPDATE: Custom cursor that indicates drag capability
  // Inspired by Yucca's drag cursor feedback
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect()
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setCursorPosition({ x: e.clientX, y: e.clientY })
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const services = t.services.items

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 mb-12">
        <div className="max-w-5xl">
          <p className="font-c text-[10px] uppercase tracking-[0.3em] text-black/40 mb-4">{t.services.subtitle}</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-a font-black tracking-tight">{t.services.title}</h2>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="relative cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsDragging(false)}
      >
        {/* Custom Drag Cursor */}
        <motion.div
          className="fixed pointer-events-none z-50 mix-blend-difference"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isDragging ? 1 : 0.6, scale: isDragging ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
            <span className="font-c text-[9px] uppercase tracking-wider text-white font-bold">
              {isDragging ? "Release" : "Drag"}
            </span>
          </div>
        </motion.div>

        {/* Scrollable Carousel */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }}
          style={{ x: springX }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex gap-8 px-6 lg:px-8 select-none"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[600px] bg-white border border-black/10 p-8 md:p-12"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-c text-[10px] uppercase tracking-[0.3em] text-black/30">{service.id}</span>
                <div className="h-[1px] flex-1 bg-black/10" />
                <span className="font-c text-[10px] uppercase tracking-[0.3em] font-bold">{service.year}</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-a font-bold mb-6 leading-tight">{service.title}</h3>

              <p className="text-base md:text-lg font-b text-black/60 leading-relaxed">{service.description}</p>

              {/* Decorative corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black/20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black/20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
