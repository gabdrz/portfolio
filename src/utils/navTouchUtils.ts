// src/utils/navTouchUtils.ts
import { RefObject } from 'react';
import gsap from 'gsap';

interface TouchState {
  startY: number;
  currentY: number;
  isExpanded: boolean;
  expandedIndex: number;
}

export const createTouchHandlers = (
  containerRef: RefObject<HTMLDivElement>,
  cards: unknown[],
  onExpand: (expanded: boolean) => void,
  onIndexChange: (index: number) => void
) => {
  const touchState: TouchState = {
    startY: 0,
    currentY: 0,
    isExpanded: false,
    expandedIndex: -1
  };

  const calculateIndexFromTouch = (touchY: number) => {
    const navElement = containerRef.current?.querySelector('.side-nav');
    if (!navElement) return -1;

    const navRect = navElement.getBoundingClientRect();
    const relativeY = touchY - navRect.top;
    const itemHeight = navRect.height / cards.length;
    const index = Math.floor(relativeY / itemHeight);
    
    return Math.max(0, Math.min(cards.length - 1, index));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchState.startY = e.touches[0].clientY;
    touchState.currentY = touchState.startY;
    
    const index = calculateIndexFromTouch(touchState.startY);
    if (index !== -1) {
      touchState.expandedIndex = index;
      touchState.isExpanded = true;
      onExpand(true);
      onIndexChange(index);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchState.currentY = e.touches[0].clientY;
    if (touchState.isExpanded) {
      const index = calculateIndexFromTouch(touchState.currentY);
      if (index !== -1 && index !== touchState.expandedIndex) {
        touchState.expandedIndex = index;
        onIndexChange(index);
      }
    }
  };

  const handleTouchEnd = () => {
    // Only scroll to the section if we haven't moved too far
    const distance = Math.abs(touchState.currentY - touchState.startY);
    if (distance < 20 && touchState.expandedIndex !== -1) {
      const cardHeight = window.innerHeight / 3;
      gsap.to(containerRef.current, {
        scrollTo: { y: cardHeight * touchState.expandedIndex },
        duration: 0.6,
        ease: "power3.out"
      });
    }

    // Reset state
    touchState.isExpanded = false;
    touchState.expandedIndex = -1;
    onExpand(false);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};