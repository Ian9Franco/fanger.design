"use client"

import { motion } from "framer-motion"
import Link from "next/link"

/**
 * Premium Animated Logo Component
 * Kinetic typography inspired by high-end design agencies.
 */
export function Logo() {
  const letters = "FANGER".split("")

  return (
    <Link href="/" className="group relative flex items-center overflow-hidden h-6">
      <div className="flex">
        {letters.map((char, i) => (
          <div key={i} className="relative overflow-hidden">
            {/* Main Letter */}
            <motion.span
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              whileHover={{ y: -30 }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.02, 
                ease: [0.76, 0, 0.24, 1] 
              }}
              className="inline-block text-xl font-black tracking-tighter"
            >
              {char}
            </motion.span>
            
            {/* Mirror Letter (for hover effect) */}
            <motion.span
              initial={{ y: 30 }}
              animate={{ y: 30 }}
              whileHover={{ y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.02, 
                ease: [0.76, 0, 0.24, 1] 
              }}
              className="absolute left-0 inline-block text-xl font-black tracking-tighter text-neutral-400"
            >
              {char}
            </motion.span>
          </div>
        ))}
      </div>
      
      {/* Dynamic line under the logo */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-black w-full origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  )
}
