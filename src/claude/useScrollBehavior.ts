/* eslint-disable @typescript-eslint/no-unused-vars */
// src/hooks/useScrollBehavior.ts
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useTouchDevice } from "./useTouchDevice";

interface ScrollConfig {
  mobileDragThreshold: number;
  tapThreshold: number;
  snapDuration: number;
}

const defaultConfig: ScrollConfig = {
  mobileDragThreshold: 30,
  tapThreshold: 15,
  snapDuration: 0.4,
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
    accumulatedDrag: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const state = scrollState.current;
    const cardHeight = window.innerHeight / 3;
    const scrollConfig = { ...defaultConfig, ...config };

    const getSnapIndex = (scrollTop: number, delta: number) => {
      const currentIndex = Math.round(scrollTop / cardHeight);
      const nextIndex = currentIndex + Math.sign(delta);
      const maxIndex = Math.floor(container.scrollHeight / cardHeight) - 3;
      return Math.max(0, Math.min(nextIndex, maxIndex));
    };

    const snapToCard = (index: number) => {
      gsap.to(container, {
        scrollTo: { y: index * cardHeight },
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
      if (e) e.preventDefault();

      const dragDist = Math.abs(currentY - state.startY);
      state.accumulatedDrag += Math.abs(currentY - state.lastY);
      state.lastY = currentY;

      if (dragDist > scrollConfig.tapThreshold) {
        state.isTap = false;
      }

      const threshold = isTouchDevice ? scrollConfig.mobileDragThreshold : 0;
      if (state.accumulatedDrag > threshold) {
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

    // Touch event handlers
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

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (isTouchDevice) return;
      e.preventDefault();
      handleStart(e.pageY);
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;
      handleMove(e.pageY, e);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isTouchDevice) return;
      handleEnd();
      container.style.cursor = "grab";
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (isTouchDevice) return;
      if (state.isDragging) {
        handleEnd();
        container.style.cursor = "grab";
      }
    };

    // Wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const snapIndex = getSnapIndex(container.scrollTop, e.deltaY);
      snapToCard(snapIndex);
    };

    // Attach event listeners
    container.addEventListener("wheel", handleWheel, { passive: false });

    if (isTouchDevice) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd);
    } else {
      container.style.cursor = "grab";
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);

      if (isTouchDevice) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      } else {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [containerRef, isTouchDevice, config]);
};
