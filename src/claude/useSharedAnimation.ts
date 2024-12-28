// src/hooks/animations/useSharedAnimation.ts
import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationTarget = HTMLElement | null;
type AnimationConfig = {
  type: 'fade' | 'scale' | 'scroll' | 'slide';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
};

export interface ScrollConfig {
  trigger?: AnimationTarget;
  scroller?: AnimationTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onUpdate?: (self: ScrollTrigger) => void;
}

export const useSharedAnimation = () => {
  // Core animation function
  const animate = useCallback((
    target: AnimationTarget | AnimationTarget[],
    config: AnimationConfig,
    scrollConfig?: ScrollConfig
  ) => {
    if (!target) return;

    const defaults = {
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true
    };

    const getAnimationProps = () => {
      switch (config.type) {
        case 'fade':
          return {
            opacity: 0,
            duration: config.duration || defaults.duration,
            ease: config.ease || defaults.ease
          };
        case 'scale':
          return {
            scale: 0.8,
            opacity: 0.3,
            duration: config.duration || defaults.duration,
            ease: config.ease || defaults.ease
          };
        case 'slide': {
          const offset = 20;
          const props: gsap.TweenVars = {
            opacity: 0,
            duration: config.duration || defaults.duration,
            ease: config.ease || defaults.ease
          };

          switch (config.direction) {
            case 'up':
              props.y = offset;
              break;
            case 'down':
              props.y = -offset;
              break;
            case 'left':
              props.x = offset;
              break;
            case 'right':
              props.x = -offset;
              break;
          }
          return props;
        }
        default:
          return {};
      }
    };

    // Kill any existing tweens on the target
    gsap.killTweensOf(target);

    const animation = gsap.to(target, {
      ...getAnimationProps(),
      delay: config.delay || 0,
      stagger: config.stagger || 0,
      ...defaults
    });

    if (scrollConfig) {
      ScrollTrigger.create({
        trigger: scrollConfig.trigger,
        start: scrollConfig.start || 'top center',
        end: scrollConfig.end || 'bottom center',
        scroller: scrollConfig.scroller,
        animation,
        scrub: scrollConfig.scrub ?? false,
        onUpdate: scrollConfig.onUpdate
      });
    }

    return animation;
  }, []);

  // Helper method for card animations
  const animateCards = useCallback((
    cards: NodeListOf<Element> | Element[],
    scroller: AnimationTarget
  ) => {
    cards.forEach((card) => {
      gsap.killTweensOf(card);
      gsap.set(card, {
        scale: 0.8,
        opacity: 0.3
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scroller,
        onUpdate: (self) => {
          const element = self.trigger as HTMLElement;
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
          const distancePercent = (distanceFromCenter / (windowHeight * 0.5));
          const progress = Math.max(0, Math.min(1, 1 - distancePercent));

          gsap.to(card, {
            scale: 0.8 + (0.2 * progress),
            opacity: 0.1 + (0.9 * progress),
            duration: 0.1,
            overwrite: 'auto',
            ease: 'none'
          });
        },
        invalidateOnRefresh: true,
        scrub: true
      });
    });
  }, []);

  return {
    animate,
    animateCards
  };
};