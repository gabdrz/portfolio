import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface BackgroundProps {
  onAnimationComplete?: () => void;
}

const Background = ({ onAnimationComplete }: BackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!backgroundRef.current || !gradientRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => onAnimationComplete?.()
    });

    // Set initial states
    gsap.set([backgroundRef.current, gradientRef.current], {
      opacity: 0
    });

    // Animation sequence
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(gradientRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.3"); // Slightly overlap animations

    return () => {
      tl.kill();
    };
  }, [onAnimationComplete]);

  return (
    <>
      {/* Base background color */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 bg-[#0d1115] z-[-2]" 
      />
      
      {/* Gradient overlay */}
      <div 
        ref={gradientRef}
        className="fixed inset-0 z-[-1]"
        style={{
          background: `
            radial-gradient(
              circle at top left,
              rgba(29, 78, 216, 0.15),
              transparent 80%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(220, 38, 38, 0.15),
              transparent 80%
            )
          `
        }}
      />
    </>
  );
};

export default Background;