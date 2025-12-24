"use client"

import { useRef, ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  className?: string
}

/**
 * TextReveal Component
 * Reveals text word by word based on scroll progress.
 * Inspired by the high-end scrollytelling in creativewebmanual.com
 */
export function TextReveal({ text, className }: TextRevealProps) {
  const element = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  })

  const words = text.split(" ")

  return (
    <div ref={element} className={cn("relative flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

interface WordProps {
  children: ReactNode
  range: [number, number]
  progress: any
}

function Word({ children, range, progress }: WordProps) {
  // Map scroll progress to opacity: from 0.1 to 1.0
  const opacity = useTransform(progress, range, [0.1, 1])
  
  return (
    <span className="relative mr-[0.25em] mt-[0.25em]">
      <span className="absolute opacity-[0.1]">{children}</span>
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
