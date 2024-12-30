// src/components/nav/NavDot.tsx
import React, { forwardRef, useEffect } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import gsap from 'gsap';

interface NavDotProps {
 isActive: boolean;
 onTouchStart: (e: React.TouchEvent) => void;
 onTouchMove: (e: React.TouchEvent) => void;
 onTouchEnd: (e: React.TouchEvent) => void;
}

export const NavDot = forwardRef<HTMLDivElement, NavDotProps>(({
 isActive,
 onTouchStart,
 onTouchMove,
 onTouchEnd
}, ref) => {
 const isMobile = useIsMobile();

 useEffect(() => {
   const dot = ref as React.MutableRefObject<HTMLDivElement | null>;
   if (!dot.current) return;

   gsap.to(dot.current, {
     opacity: isActive ? 1 : 0.5,
     scale: isActive ? 1.25 : 1,
     duration: 0.2,
     ease: "power2.inOut"
   });
 }, [isActive, ref]);

 return (
   <div 
     className="flex-shrink-0 mr-2 py-2"
     onTouchStart={onTouchStart}
     onTouchMove={onTouchMove}
     onTouchEnd={onTouchEnd}
   >
     <div 
       ref={ref}
       className={`
         rounded-full bg-[#CCDAE5]
         ${isMobile ? 'w-3 h-3' : 'w-2 h-2'}
       `}
     />
   </div>
 );
});