// src/utils/scrollUtils.ts
import gsap from 'gsap';

export const calculateSnapPosition = (
  currentScroll: number,
  cardHeight: number
): number => {
  const normalizedScroll = currentScroll - cardHeight;
  const cardIndex = Math.round(normalizedScroll / cardHeight);
  return cardHeight + (cardIndex * cardHeight);
};

export const calculateNextSnapPosition = (
  container: HTMLDivElement,
  direction: 1 | -1,
  cardHeight: number,
  getSnapPosition: (currentScroll: number) => number
): number => {
  const currentScroll = container.scrollTop;
  const currentSnapPosition = getSnapPosition(currentScroll);
  return currentSnapPosition + (direction * cardHeight);
};

export const animateScrollToPosition = (
  container: HTMLDivElement,
  targetPosition: number
): void => {
  gsap.killTweensOf(container);
  gsap.to(container, {
    scrollTo: { y: targetPosition },
    duration: 0.6,
    ease: 'power2.out',
    overwrite: true
  });
};