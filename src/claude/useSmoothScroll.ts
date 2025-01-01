// src/hooks/useSmoothScroll.ts
import { useEffect, useRef } from 'react';
import { useTouchDevice } from './useTouchDevice';
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import debounce from 'lodash/debounce';

gsap.registerPlugin(ScrollToPlugin);

interface ScrollState {
  velocity: number;
  lastScrollTime: number;
  lastDelta: number;
  acceleration: number;
}

interface UseSmoothScrollOptions {
  baseSpeed?: number;      // Base scrolling speed multiplier
  maxSpeed?: number;       // Maximum scroll speed
  momentumDuration?: number; // How long momentum continues
  momentumEase?: string;   // Easing function for momentum
  velocityThreshold?: number; // Minimum velocity to trigger momentum
}

export const useSmoothScroll = (
  containerRef: React.RefObject<HTMLElement>,
  options: UseSmoothScrollOptions = {}
) => {
  const isTouchDevice = useTouchDevice();
  const scrollState = useRef<ScrollState>({
    velocity: 0,
    lastScrollTime: 0,
    lastDelta: 0,
    acceleration: 1
  });
  
  useEffect(() => {
    if (isTouchDevice || !containerRef.current) return;

    const container = containerRef.current;
    const {
      baseSpeed = 0.5,
      maxSpeed = 150,
      momentumDuration = 1.5,
      momentumEase = "power4.out",
      velocityThreshold = 30
    } = options;

    // Calculate velocity based on time between wheel events and delta
    const updateVelocity = (delta: number) => {
      const state = scrollState.current;
      const now = performance.now();
      const timeDelta = now - state.lastScrollTime;
      
      // Update velocity
      if (timeDelta > 0) {
        const instantVelocity = Math.abs(delta) / timeDelta;
        state.velocity = instantVelocity;
      }

      // Update acceleration based on consistent direction
      if (Math.sign(delta) === Math.sign(state.lastDelta)) {
        state.acceleration = Math.min(state.acceleration * 1.1, 2.0);
      } else {
        state.acceleration = 1.0;
      }

      state.lastScrollTime = now;
      state.lastDelta = delta;
    };

    // Calculate scroll amount based on velocity and acceleration
    const calculateScrollAmount = (delta: number) => {
      const state = scrollState.current;
      const direction = Math.sign(delta);
      const velocity = state.velocity;
      
      // Base scroll amount with velocity influence
      let scrollAmount = delta * baseSpeed;
      
      // Apply velocity scaling
      if (velocity > 0.1) {
        const velocityMultiplier = Math.min(velocity * 50, maxSpeed);
        scrollAmount *= (1 + velocityMultiplier * 0.02);
      }

      // Apply acceleration for continuous scrolling
      scrollAmount *= state.acceleration;

      // Clamp final value
      return Math.min(Math.abs(scrollAmount), maxSpeed) * direction;
    };

    // Apply momentum scrolling
    const applyMomentum = (velocity: number, currentScroll: number) => {
      if (Math.abs(velocity) < velocityThreshold) return;

      const direction = Math.sign(scrollState.current.lastDelta);
      const momentumDistance = velocity * direction * 50; // Scale factor for momentum distance

      gsap.to(container, {
        scrollTo: { 
          y: currentScroll + momentumDistance,
          autoKill: true 
        },
        duration: momentumDuration,
        ease: momentumEase,
        overwrite: "auto"
      });
    };
    let scrollTimeout: number;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Update velocity calculations
      updateVelocity(e.deltaY);
      
      // Calculate enhanced scroll amount
      const scrollAmount = calculateScrollAmount(e.deltaY);
      const targetScroll = container.scrollTop + scrollAmount;

      // Kill any existing animations
      gsap.killTweensOf(container);

      // Perform the scroll
      gsap.to(container, {
        scrollTo: { y: targetScroll, autoKill: true },
        duration: 0.2,
        ease: "power1.out",
        overwrite: "auto",
        onStart: () => {
          isScrolling = true;
          window.clearTimeout(scrollTimeout);
        },
        onComplete: () => {
          scrollTimeout = window.setTimeout(() => {
            isScrolling = false;
            // Apply momentum when user stops scrolling
            applyMomentum(scrollState.current.velocity, container.scrollTop);
          }, 50);
        }
      });
    };

    // Debounced wheel handler
    const debouncedWheel = debounce(handleWheel, 16, { 
      leading: true,
      maxWait: 50
    });

    container.addEventListener('wheel', debouncedWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', debouncedWheel);
      window.clearTimeout(scrollTimeout);
      debouncedWheel.cancel();
    };
  }, [containerRef, isTouchDevice, options]);
};