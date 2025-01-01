// src/hooks/useScrollBehavior.ts
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useTouchDevice } from "./useTouchDevice";

interface ScrollConfig {
  // Higher values make scrolling less sensitive (require more drag)
  mobileDragThreshold: number;
  // Minimum distance needed to consider a drag vs a tap
  tapThreshold: number;
  // Animation duration for snap
  snapDuration: number;
}

const defaultConfig: ScrollConfig = {
  mobileDragThreshold: 30, // Pixels needed to trigger a scroll on mobile
  tapThreshold: 10,       // Pixels to differentiate tap from drag
  snapDuration: 0.3       // Seconds for snap animation
};

export const useScrollBehavior = (
  containerRef: RefObject<HTMLDivElement>,
  config: Partial<ScrollConfig> = {}
) => {
  const isTouchDevice = useTouchDevice();
  const scrollState = useRef({
    isDragging: false,
    startY: 0,
    startScroll: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    isTap: false,
    accumulatedDrag: 0 // Track total drag distance
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const state = scrollState.current;
    const cardHeight = window.innerHeight / 3;
    let lastSnapTime = 0;

    // Merge provided config with defaults
    const scrollConfig = { ...defaultConfig, ...config };

    const getSnapIndex = (scrollTop: number, delta: number) => {
      const currentIndex = Math.round(scrollTop / cardHeight);
      const nextIndex = currentIndex + Math.sign(delta);
      const maxIndex = Math.floor(container.scrollHeight / cardHeight) - 3;
      return Math.max(0, Math.min(nextIndex, maxIndex));
    };

    const snapToCard = (index: number) => {
      const targetY = index * cardHeight;
      gsap.to(container, {
        scrollTo: { y: targetY },
        duration: scrollConfig.snapDuration,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleStart = (startY: number) => {
      state.isTap = true;
      state.accumulatedDrag = 0;
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
      state.accumulatedDrag += Math.abs(currentY - state.lastY);
      state.lastY = currentY;

      // Check if this should be considered a drag rather than a tap
      if (dragDist > scrollConfig.tapThreshold) {
        state.isTap = false;
      }

      // For touch devices, only update scroll after exceeding threshold
      if (isTouchDevice) {
        if (state.accumulatedDrag > scrollConfig.mobileDragThreshold) {
          const newScrollTop = state.startScroll - (currentY - state.startY);
          container.scrollTop = newScrollTop;
        }
      } else {
        // For non-touch devices, update scroll immediately
        const newScrollTop = state.startScroll - (currentY - state.startY);
        container.scrollTop = newScrollTop;
      }
    };

    const handleEnd = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      
      if (!state.isTap) {
        const snapIndex = Math.round(container.scrollTop / cardHeight);
        snapToCard(snapIndex);
      }
    };

    // Rest of the event handlers remain the same...
    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientY, e);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      handleEnd();
      if (state.isTap) {
        const target = e.target as HTMLElement;
        if (target) target.click();
      }
    };

    // Mouse event handlers...
    const handleMouseDown = (e: MouseEvent) => {
      if (isTouchDevice) return;
      handleStart(e.pageY);
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      if (!state.isDragging) return;
      handleMove(e.pageY);
    };

    const handleMouseUp = () => {
      if (isTouchDevice) return;
      handleEnd();
      container.style.cursor = "grab";
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTouchDevice) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastSnapTime < 300) return;
      lastSnapTime = now;

      const snapIndex = getSnapIndex(container.scrollTop, e.deltaY);
      snapToCard(snapIndex);
    };

    // Set up event listeners...
    if (!isTouchDevice) {
      container.style.cursor = "grab";
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("wheel", handleWheel, { passive: false });

    if (!isTouchDevice) {
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

      if (!isTouchDevice) {
        container.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseUp);
      }
    };
  }, [containerRef, isTouchDevice, config]);
};