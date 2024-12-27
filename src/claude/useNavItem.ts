// src/hooks/useNavItem.ts
import { useRef, useCallback } from 'react';

interface UseNavItemProps {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useNavItem = ({ onTouchStart, onTouchMove, onTouchEnd }: UseNavItemProps) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onTouchStart(e.nativeEvent);
  }, [onTouchStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onTouchMove(e.nativeEvent);
  }, [onTouchMove]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    onTouchEnd();
  }, [onTouchEnd]);

  return {
    labelRef,
    dotRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};