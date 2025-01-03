import { useState, useEffect } from 'react';

export const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    let touchStarted = false;

    const handleTouchStart = () => {
      touchStarted = true;
      setIsTouch(true);
    };

    const handleMouseDown = () => {
      if (!touchStarted) {
        setIsTouch(false);
      }
      touchStarted = false;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isTouch;
};