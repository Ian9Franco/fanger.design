"use client"

// Hook para gestionar el cursor personalizado
// Rastrea la posición del mouse y detecta dispositivos táctiles

import { useState, useEffect } from "react"

export function useCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detectar si es dispositivo táctil al montar
    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }
    checkTouchDevice()

    // Si es táctil, no activar el cursor personalizado
    if (isTouchDevice) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const hideCursor = () => setIsVisible(false)
    const showCursor = () => setIsVisible(true)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", hideCursor)
    document.addEventListener("mouseenter", showCursor)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", hideCursor)
      document.removeEventListener("mouseenter", showCursor)
    }
  }, [isTouchDevice, isVisible])

  return { position, isVisible, isTouchDevice }
}
