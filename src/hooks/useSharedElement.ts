// src/hooks/useSharedElement.ts
import { useCallback } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

interface TransitionOptions {
  duration?: number;
  ease?: string;
  absolute?: boolean;
  onComplete?: () => void;
}

export const useSharedElement = () => {
  const createFlipTransition = useCallback(
    (
      element: HTMLElement,
      state: Flip.FlipState,
      options: TransitionOptions = {}
    ) => {
      const {
        duration = 0.5,
        ease = "power2.inOut",
        absolute = true,
        onComplete,
      } = options;

      return Flip.from(state, {
        duration,
        ease,
        absolute,
        onComplete,
        nested: true,
        spin: false,
        preserveScroll: true,
        prune: true,
        simple: true,
      });
    },
    []
  );

  const captureFlipState = useCallback(
    (element: HTMLElement) => {
      const flipState = Flip.getState(element, {
        props: ["position", "size", "scale", "rotation"],
        simple: true,
      });

      // Extract only serializable properties
      const serializableState = {
        positions: flipState.positions,
        props: flipState.props,
        other: flipState.other, // Include only required serializable properties
      };

      return serializableState;
    },
    []
  );

  const transition = useCallback(
    (
      fromElement: HTMLElement,
      toElement: HTMLElement,
      options: TransitionOptions = {}
    ) => {
      const state = captureFlipState(fromElement);

      const tl = gsap.timeline();
      tl.add(() => {
        createFlipTransition(toElement, state, options);
      });

      return tl;
    },
    [captureFlipState, createFlipTransition]
  );

  const getSharedElements = useCallback((fromId: string, toId: string) => {
    const fromElement = document.getElementById(fromId);
    const toElement = document.getElementById(toId);

    return {
      fromElement,
      toElement,
      canTransition: !!(fromElement && toElement),
    };
  }, []);

  return {
    transition,
    captureFlipState,
    createFlipTransition,
    getSharedElements,
  };
};
