"use client"

import { motion } from "framer-motion"

/**
 * Crosshair marker for corner decorations
 */
export function Crosshair() {
  return (
    <div className="flex items-center justify-center w-6 h-6">
      <div className="absolute w-[1px] h-full bg-neutral-200" />
      <div className="absolute h-[1px] w-full bg-neutral-200" />
    </div>
  )
}

/**
 * Technical tag helper
 */
export function TechTag({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1 font-c uppercase text-[10px] tracking-widest text-neutral-400">
      <span className="opacity-50">{label}</span>
      <span className="text-neutral-900 font-bold">{value}</span>
    </div>
  )
}

/**
 * Grid section marker
 */
export function SectionMarker({ number, title }: { number: string, title: string }) {
  return (
    <div className="flex items-center gap-4 font-c mb-12">
      <div className="px-3 py-1 bg-black text-white text-xs font-bold leading-none">
        [{number}]
      </div>
      <div className="h-[1px] flex-grow bg-neutral-200" />
      <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-black opacity-80">
        {title}
      </div>
    </div>
  )
}
