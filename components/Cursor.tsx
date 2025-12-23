"use client"

// Componente de cursor personalizado
// Crea un cursor circular que sigue al mouse
// Se desactiva automáticamente en dispositivos táctiles

import { useCursor } from "@/hooks/use-cursor"
import { motion, AnimatePresence } from "framer-motion"

export function Cursor() {
  const { position, isVisible, isTouchDevice } = useCursor()

  // No renderizar en dispositivos táctiles
  if (isTouchDevice) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed z-50 mix-blend-difference"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
