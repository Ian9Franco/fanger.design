'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  splitBy?: 'chars' | 'words' | 'lines';
  animation?: 'fadeIn' | 'slideUp' | 'staggerFade' | 'typing';
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  className?: string;
  textClassName?: string;
}

export function AnimatedText({
  text,
  splitBy = 'words',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  once = true,
  className,
  textClassName,
  ...props
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current || !textRef.current) return;

    const textElement = textRef.current;
    const chars = textElement.textContent?.split('') || [];
    
    // Clear the text content
    textElement.textContent = '';
    
    // Create spans for each character
    const charElements = chars.map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      textElement.appendChild(span);
      return span;
    });

    // Set initial styles based on animation type
    const setInitialStyles = () => {
      gsap.set(charElements, { opacity: 0 });
      
      switch (animation) {
        case 'fadeIn':
          gsap.set(charElements, { opacity: 0 });
          break;
        case 'slideUp':
          gsap.set(charElements, { y: 40, opacity: 0 });
          break;
        case 'staggerFade':
          gsap.set(charElements, { opacity: 0, y: 20 });
          break;
        case 'typing':
          gsap.set(charElements, { opacity: 0, width: 0 });
          break;
      }
    };

    // Create animation based on type
    const animateText = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once,
        },
      });

      switch (animation) {
        case 'fadeIn':
          tl.to(charElements, {
            opacity: 1,
            duration,
            delay,
            stagger: stagger * 0.5,
            ease: 'power3.out',
          });
          break;
          
        case 'slideUp':
          tl.to(charElements, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            stagger: stagger,
            ease: 'power3.out',
          });
          break;
          
        case 'staggerFade':
          tl.to(charElements, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            stagger: stagger,
            ease: 'power3.out',
          });
          break;
          
        case 'typing':
          tl.to(charElements, {
            width: 'auto',
            opacity: 1,
            duration: duration * 0.5,
            delay,
            stagger: {
              amount: duration,
              from: 'start',
            },
            ease: 'power2.inOut',
          });
          break;
      }

      return tl;
    };

    setInitialStyles();
    const animation = animateText();

    return () => {
      // Clean up animations on unmount
      if (animation) animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text, splitBy, animation, delay, duration, stagger, once]);

  return (
    <div 
      ref={containerRef} 
      className={cn('inline-block overflow-hidden', className)}
      {...props}
    >
      <span ref={textRef} className={cn('inline-block', textClassName)}>
        {text}
      </span>
    </div>
  );
}
