// src/hooks/useSharedElement.ts
import { useCallback } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

interface TransitionOptions {
  duration?: number;
  ease?: string;
  absolute?: boolean;
  onComplete?: () => void;
}

export const useSharedElement = () => {
  // Helper to create consistent flip animations
  const createFlipTransition = useCallback((
    element: HTMLElement,
    state: Flip.FlipState,
    options: TransitionOptions = {}
  ) => {
    const {
      duration = 0.5,
      ease = 'power2.inOut',
      absolute = true,
      onComplete
    } = options;

    return Flip.from(state, {
      duration,
      ease,
      absolute,
      onComplete,
      nested: true, // Better handling of nested elements
      spin: false, // Prevent unwanted rotations
      preserveScroll: true, // Maintain scroll positions
      prune: true, // Remove unused properties
      simple: true, // Optimize performance
    });
  }, []);

  // Helper for capturing flip states
  const captureFlipState = useCallback((
    element: HTMLElement,
    props: string[] = ['position', 'size', 'scale', 'rotation']
  ) => {
    return Flip.getState(element, {
      props,
      simple: true,
    });
  }, []);

  // Main transition handler
  const transition = useCallback((
    fromElement: HTMLElement,
    toElement: HTMLElement,
    options: TransitionOptions = {}
  ) => {
    // Capture initial state
    const state = captureFlipState(fromElement);
    
    // Create timeline for coordinated animations
    const tl = gsap.timeline();

    // Add the flip animation to the timeline
    tl.add(() => {
      createFlipTransition(toElement, state, options);
    });

    return tl;
  }, [captureFlipState, createFlipTransition]);

  // Helper for finding shared elements by ID
  const getSharedElements = useCallback((fromId: string, toId: string) => {
    const fromElement = document.getElementById(fromId);
    const toElement = document.getElementById(toId);
    
    return {
      fromElement,
      toElement,
      canTransition: !!(fromElement && toElement)
    };
  }, []);

  return {
    transition,
    captureFlipState,
    createFlipTransition,
    getSharedElements
  };
};