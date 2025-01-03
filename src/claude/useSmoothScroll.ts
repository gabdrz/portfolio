// src/hooks/useSmoothScroll.ts

import { useEffect, useRef } from "react";
import { useTouchDevice } from "./useTouchDevice";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import debounce from "lodash/debounce";

gsap.registerPlugin(ScrollToPlugin);

interface ScrollState {
  velocity: number;
  timestamp: number;
  lastScrollTop: number;
}

export const useSmoothScroll = (
  containerRef: React.RefObject<HTMLElement>,
  options: {
    friction?: number;
    acceleration?: number;
    velocityThreshold?: number;
  } = {}
) => {
  const isTouchDevice = useTouchDevice();
  const scrollState = useRef<ScrollState>({
    velocity: 0,
    timestamp: 0,
    lastScrollTop: 0,
  });
  const rafId = useRef<number>();

  useEffect(() => {
    if (isTouchDevice || !containerRef.current) return;

    const container = containerRef.current;
    const {
      friction = 0.85,
      acceleration = 0.1,
      velocityThreshold = 0.1,
    } = options;

    const updateScroll = () => {
      const state = scrollState.current;
      const now = performance.now();
      const delta = now - state.timestamp;

      if (delta > 0 && Math.abs(state.velocity) > velocityThreshold) {
        const newScrollTop = container.scrollTop + state.velocity * delta;
        container.scrollTop = newScrollTop;
        state.velocity *= friction;
        state.timestamp = now;
        rafId.current = requestAnimationFrame(updateScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const state = scrollState.current;
      const now = performance.now();
      const delta = now - state.timestamp;

      if (delta > 0) {
        state.velocity = (e.deltaY * acceleration) / delta;
        state.timestamp = now;

        if (!rafId.current) {
          rafId.current = requestAnimationFrame(updateScroll);
        }
      }
    };

    const debouncedWheel = debounce(handleWheel, 16, {
      leading: true,
      trailing: false,
    });

    container.addEventListener("wheel", debouncedWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", debouncedWheel);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      debouncedWheel.cancel();
    };
  }, [containerRef, isTouchDevice, options]);
};
