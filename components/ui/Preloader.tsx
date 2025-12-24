"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Preloader Component
 * A minimalist preloader inspired by creativewebmanual.com
 * Shows a 0-100% counter with a technical/manual aesthetic.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Hold at 100 for a moment then finish
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        // Random increments for a more "organic" loading feel
        const increment = Math.floor(Math.random() * 10) + 1
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white font-mono"
        >
          {/* Subtle background grid effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
          />

          <div className="relative z-10 w-full max-w-md px-10">
            {/* Technical labeling */}
            <div className="flex justify-between mb-2 text-[10px] tracking-widest uppercase opacity-50">
              <span>System Initialization</span>
              <span>FNG_DEV_2024</span>
            </div>

            {/* The Counter */}
            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="text-8xl md:text-9xl font-black tracking-tighter"
              >
                {progress.toString().padStart(3, '0')}
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="h-[1px] w-full bg-white/20 mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            {/* Detailed tech logs */}
            <div className="mt-4 flex flex-col gap-1 text-[8px] opacity-40 uppercase tracking-[0.2em]">
              <div className="flex justify-between">
                <span>Core Modules</span>
                <span>[ OK ]</span>
              </div>
              <div className="flex justify-between">
                <span>Visual Engine</span>
                <span>[ {progress > 40 ? 'OK' : '...'} ]</span>
              </div>
              <div className="flex justify-between">
                <span>Identity Assets</span>
                <span>[ {progress > 80 ? 'OK' : '...'} ]</span>
              </div>
            </div>
          </div>

          {/* Crosshair markers in corners */}
          <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/30" />
          <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/30" />
          <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/30" />
          <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/30" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
