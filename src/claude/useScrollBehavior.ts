// src/hooks/useScrollBehavior.ts
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsMobile } from "./useIsMobile";

export const useScrollBehavior = (containerRef: RefObject<HTMLDivElement>) => {
  const isMobile = useIsMobile();
  const scrollState = useRef({
    isDragging: false,
    startY: 0,
    startScroll: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    isTap: false,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const state = scrollState.current;
    const cardHeight = window.innerHeight / 3;
    let lastSnapTime = 0;

    /**
     * Snap to the closest card index.
     */
    const getSnapIndex = (scrollTop: number, delta: number) => {
      const currentIndex = Math.round(scrollTop / cardHeight);
      const nextIndex = currentIndex + Math.sign(delta);
      const maxIndex = Math.floor(container.scrollHeight / cardHeight) - 3;
      return Math.max(0, Math.min(nextIndex, maxIndex));
    };

    const snapToCard = (index: number) => {
      const targetY = index * cardHeight;
      const duration = 0.3; // Fixed duration for snappiness

      gsap.to(container, {
        scrollTo: { y: targetY },
        duration,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleStart = (startY: number) => {
      state.isTap = true; // Assume a tap initially
      gsap.killTweensOf(container);
      state.isDragging = true;
      state.startY = startY;
      state.startScroll = container.scrollTop;
      state.lastY = startY;
      state.lastTime = Date.now();
      state.velocity = 0;
    };

    const handleMove = (currentY: number, e?: Event) => {
      if (!state.isDragging) return;
      e?.preventDefault();

      const dragDist = Math.abs(currentY - state.startY);
      if (dragDist > 10) {
        state.isTap = false; // If the user drags more than a small threshold, it's not a tap
      }

      const newScrollTop = state.startScroll - (currentY - state.startY);
      container.scrollTop = newScrollTop;
    };

    const handleEnd = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      if (!state.isTap) {
        const snapIndex = Math.round(container.scrollTop / cardHeight);
        snapToCard(snapIndex);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientY, e);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      handleEnd();
      if (state.isTap) {
        // If it was a tap, let it propagate to handle clicks
        const target = e.target as HTMLElement;
        if (target) target.click();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isMobile) return;
      handleStart(e.pageY);
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (!state.isDragging) return;
      handleMove(e.pageY);
    };

    const handleMouseUp = () => {
      if (isMobile) return;
      handleEnd();
      container.style.cursor = "grab";
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastSnapTime < 300) return; // Throttle snaps to avoid overriding animations
      lastSnapTime = now;

      const snapIndex = getSnapIndex(container.scrollTop, e.deltaY);
      snapToCard(snapIndex);
    };

    if (!isMobile) {
      container.style.cursor = "grab";
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, { passive: false });

    if (!isMobile) {
      container.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseUp);
    }

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);

      if (!isMobile) {
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [containerRef, isMobile]);
};
