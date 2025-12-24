'use client';

import { useEffect } from 'react';
import { initSmoothScrolling, setupScrollTrigger } from '@/lib/animations';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Setup GSAP ScrollTrigger
    setupScrollTrigger();
    
    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []);

  return <>{children}</>;
}
