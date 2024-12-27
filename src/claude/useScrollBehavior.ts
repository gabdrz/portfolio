// src/hooks/useScrollBehavior.ts
import { RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from './useIsMobile';

export const useScrollBehavior = (containerRef: RefObject<HTMLDivElement>) => {
  const isMobile = useIsMobile();
  const scrollState = useRef({
    isDragging: false,
    startY: 0,
    startScroll: 0,
    lastY: 0,
    velocity: 0,
    lastTime: 0
  });
  
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const state = scrollState.current;
    const cardHeight = window.innerHeight / 3;

    const getSnapTarget = (velocity: number) => {
      const currentScroll = container.scrollTop;
      let index = Math.round(currentScroll / cardHeight);
      
      // Add momentum-based card skipping
      if (Math.abs(velocity) > 1.5) {
        index += velocity > 0 ? 1 : -1;
      }
      
      // Clamp to valid range
      const maxIndex = Math.floor(container.scrollHeight / cardHeight) - 3;
      return Math.max(0, Math.min(index, maxIndex)) * cardHeight;
    };

    const snapToPosition = (targetY: number) => {
      gsap.to(container, {
        scrollTo: { y: targetY },
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          state.velocity = 0;
        }
      });
    };

    const updateVelocity = (currentY: number) => {
      const now = Date.now();
      const deltaTime = now - state.lastTime;
      if (deltaTime > 0) {
        const deltaY = currentY - state.lastY;
        state.velocity = deltaY / deltaTime;
      }
      state.lastY = currentY;
      state.lastTime = now;
    };

    const handleStart = (y: number) => {
      state.isDragging = true;
      state.startY = y;
      state.lastY = y;
      state.startScroll = container.scrollTop;
      state.lastTime = Date.now();
      state.velocity = 0;
      gsap.killTweensOf(container);
    };

    const handleMove = (y: number) => {
      if (!state.isDragging) return;
      
      const delta = y - state.lastY;
      container.scrollTop -= delta;
      updateVelocity(y);
    };

    const handleEnd = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      const targetY = getSnapTarget(state.velocity);
      snapToPosition(targetY);
    };

    // Touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientY);
    };

    // Mouse handlers (desktop only)
    const handleMouseDown = (e: MouseEvent) => {
      if (isMobile) return;
      handleStart(e.pageY);
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      handleMove(e.pageY);
    };

    const handleMouseUp = () => {
      if (isMobile) return;
      handleEnd();
      container.style.cursor = 'grab';
    };

    // Wheel handler (desktop only)
    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return;
      e.preventDefault();
      
      const direction = Math.sign(e.deltaY);
      const currentScroll = container.scrollTop;
      const currentCard = Math.round(currentScroll / cardHeight);
      const targetCard = currentCard + direction;
      const targetY = targetCard * cardHeight;
      
      snapToPosition(targetY);
    };

    // Set initial styles
    if (!isMobile) {
      container.style.cursor = 'grab';
    }

    // Add event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleEnd);
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    if (!isMobile) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleEnd);
      container.removeEventListener('wheel', handleWheel);
      
      if (!isMobile) {
        container.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseleave', handleMouseUp);
      }
    };
  }, [containerRef, isMobile]);
};