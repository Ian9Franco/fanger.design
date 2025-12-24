'use client';

import { useCustomCursor } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface CustomCursorProps {
  className?: string;
  followerClassName?: string;
}

export function CustomCursor({
  className = '',
  followerClassName = '',
}: CustomCursorProps) {
  const { cursorRef, cursorFollowerRef } = useCustomCursor();

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          'fixed w-4 h-4 bg-white border-2 border-black rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference',
          'transition-transform duration-200 ease-out',
          className
        )}
        style={{ textAlign: 'center', willChange: 'transform' }}
      />
      <div
        ref={cursorFollowerRef}
        id="cursor-follower"
        className={cn(
          'fixed flex items-center justify-center bg-white rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2',
          'transition-all duration-500 ease-out overflow-hidden',
          followerClassName
        )}
        style={{ 
          willChange: 'transform, width, height, opacity',
          width: '8px', 
          height: '8px' 
        }}
      >
        <span 
          id="cursor-text"
          className="text-[10px] font-bold uppercase tracking-widest text-black opacity-0 whitespace-nowrap px-4"
        >
          Learn more
        </span>
      </div>
    </>
  );
}
