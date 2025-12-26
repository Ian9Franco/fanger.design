'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'excluded'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the FOLLOWER (Circle)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      
      // Check for excluded elements
      if (target.closest('.no-cursor')) {
        setCursorType('excluded');
        return;
      }

      // Check for interactive elements
      const interactive = target.closest('a, button, .interactive, [data-cursor-text]');
      if (interactive) {
        const text = interactive.getAttribute('data-cursor-text');
        if (text) {
          setCursorType('text');
          setCursorText(text);
        } else {
          setCursorType('pointer');
        }
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (cursorType === 'excluded') return null;

  return (
    <>
      {/* 
        1. BACKGROUND FOLLOWER (The Circle) 
        Kept as requested: animates and expands on hover.
      */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          width: cursorType === 'text' ? (cursorText.length * 8 + 40) : (cursorType === 'pointer' ? 60 : 32),
          height: cursorType === 'text' ? 40 : (cursorType === 'pointer' ? 60 : 32),
          scale: isClicking ? 0.8 : 1,
          backgroundColor: cursorType === 'pointer' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0)',
        }}
        transition={{ type: 'spring', ...springConfig }}
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <AnimatePresence>
          {cursorType === 'text' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-white px-4 whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 
        2. MAIN CURSOR (Fanger Logo)
        Replaces the dot. Moves instantly with mouse.
        Fanger Yellow: #e2e200
      */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%', // Center the logo group on the cursor tip
          translateY: '-50%',
        }}
      >
        {/* Container for the 3 squares, scaled down to cursor size */}
        <motion.div 
          className="relative w-4 h-4"
          animate={{
            scale: cursorType === 'pointer' ? 1.2 : 1, // Subtle pop on hover
            rotate: cursorType === 'pointer' ? -90 : 0, // Playful rotation
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Mobile (Bottom Left) */}
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#e2e200]" />
          
          {/* Tablet (Center) */}
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#e2e200] transform -translate-x-1/2 -translate-y-1/2" />
          
          {/* Desktop (Top Right) */}
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#e2e200]" />
        </motion.div>
      </motion.div>

      {/* Optional: Magnetic Glow (User didn't explicitly ask to remove it, adds nice touch) */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none z-[9997]"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: cursorType === 'pointer' ? 0.3 : 0.1,
        }}
      />
    </>
  );
}
