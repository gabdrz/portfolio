// src/hooks/useViewportHeight.ts
import { useState, useEffect } from 'react';

export const useViewportHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Function to update height
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    // Initial update
    updateHeight();

    // Update on resize
    window.addEventListener('resize', updateHeight);
    
    // Update on orientation change
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure new dimensions are calculated
      setTimeout(updateHeight, 100);
    });

    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
    };
  }, []);

  return height;
};