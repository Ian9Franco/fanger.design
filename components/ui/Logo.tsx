"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

/**
 * Premium Animated Logo Component
 * Kinetic typography inspired by high-end design agencies.
 */
export function Logo() {
  return (
    <Link href="/" className="group relative flex items-center h-8">
      <div className="relative overflow-hidden h-8 w-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src="/logo/Logo-Fanger.png"
            alt="Fanger Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </motion.div>
      </div>
      
      {/* Dynamic line under the logo */}
      <motion.div 
        className="absolute -bottom-1 left-0 h-[1px] bg-black w-full origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  )
}
