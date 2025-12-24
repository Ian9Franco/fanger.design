'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp';
  delay?: number;
  duration?: number;
  once?: boolean;
  viewport?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  };
}

export function AnimateOnScroll({
  children,
  className,
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
  once = false,
  viewport = { start: 'top 80%', end: 'bottom 20%' },
}: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return;

    const element = elementRef.current;
    
    // Set initial styles based on animation type
    const initialStyles: gsap.TweenVars = { opacity: 0 };
    
    switch (animation) {
      case 'fadeIn':
        initialStyles.opacity = 0;
        break;
      case 'slideUp':
        initialStyles.y = 40;
        break;
      case 'slideInLeft':
        initialStyles.x = -40;
        break;
      case 'slideInRight':
        initialStyles.x = 40;
        break;
      case 'scaleUp':
        initialStyles.scale = 0.9;
        break;
    }

    // Set initial state
    gsap.set(element, initialStyles);

    // Create animation
    const animationVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: viewport.start,
        end: viewport.end,
        scrub: viewport.scrub,
        once,
        markers: false, // Set to true for debugging
      },
    };

    const tl = gsap.timeline({
      scrollTrigger: animationVars.scrollTrigger,
    });

    tl.to(element, animationVars);

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, delay, duration, once, viewport]);

  return (
    <div ref={elementRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}
