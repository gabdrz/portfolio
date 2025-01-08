// src/hooks/animations/useSharedAnimation.ts
import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationTarget {
  element: HTMLElement | null;
  from?: gsap.TweenVars;
  to: gsap.TweenVars;
}

interface TimelineConfig {
  delay?: number;
  onComplete?: () => void;
  stagger?: number;
  duration?: number;
  ease?: string;
}

// Animation presets for different card types
const ANIMATION_PRESETS = {
  profile: {
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
  },
  links: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
  },
  header: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.4, ease: 'power2.out' }
  },
  project: {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
  }
};

export const useSharedAnimation = () => {
  // Create a timeline with multiple animations
  const createTimeline = useCallback((
    targets: AnimationTarget[],
    config: TimelineConfig = {}
  ) => {
    const timeline = gsap.timeline({
      delay: config.delay,
      onComplete: config.onComplete,
    });

    targets.forEach((target, index) => {
      if (!target.element) return;

      // Set initial state
      if (target.from) {
        gsap.set(target.element, target.from);
      }

      // Add to timeline
      timeline.to(
        target.element,
        {
          ...target.to,
          delay: index > 0 ? (config.stagger || 0.1) : 0
        },
        index > 0 ? '-=0.3' : 0 // Overlap animations slightly
      );
    });

    return timeline;
  }, []);

  // Get preset animation for a card type
  const getPresetAnimation = useCallback((type: keyof typeof ANIMATION_PRESETS) => {
    return ANIMATION_PRESETS[type];
  }, []);

  // Original animate function for single elements
  const animate = useCallback((
    target: HTMLElement | null,
    config: gsap.TweenVars,
    scrollConfig?: ScrollTrigger.Vars
  ) => {
    if (!target) return;

    const animation = gsap.to(target, {
      ...config,
      overwrite: true
    });

    if (scrollConfig) {
      ScrollTrigger.create({
        trigger: target,
        animation,
        ...scrollConfig
      });
    }

    return animation;
  }, []);

  // Original animateCards function for scroll animations
  const animateCards = useCallback((
    cards: NodeListOf<Element> | Element[],
    scroller: HTMLElement | null
  ) => {
    if (!scroller) return;

    cards.forEach((card) => {
      gsap.killTweensOf(card);
      
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scroller,
        onUpdate: (self) => {
          const progress = Math.abs(self.progress - 0.5) * 2;
          const scale = 0.8 + (0.2 * (1 - progress));
          const opacity = 0.3 + (0.7 * (1 - progress));

          gsap.to(card, {
            scale,
            opacity,
            duration: 0.1,
            overwrite: 'auto',
            ease: 'none'
          });
        }
      });
    });
  }, []);

  return {
    animate,
    animateCards,
    createTimeline,
    getPresetAnimation
  };
};