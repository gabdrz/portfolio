// src/hooks/useProjectAnimations.ts
import { RefObject, useEffect } from 'react';
import { ProjectCard } from '../types/cards';
import { useSharedAnimation } from './animations/useSharedAnimation';
import gsap from 'gsap';

interface UseProjectAnimationsProps {
  containerRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
  project: ProjectCard | undefined;
}

export const useProjectAnimations = ({
  containerRef,
  contentRef,
  headerRef,
  project
}: UseProjectAnimationsProps) => {
  const { animate } = useSharedAnimation();

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !headerRef.current || !project) return;

    // Set up initial states
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });
    gsap.set(headerRef.current, { opacity: 0, y: -20 });

    // Animate elements
    const tl = gsap.timeline();

    tl.add(animate(containerRef.current, {
      type: 'fade',
      duration: 0.3
    }))
    .add(animate(headerRef.current, {
      type: 'slide',
      direction: 'up',
      duration: 0.4
    }), '-=0.2')
    .add(animate(contentRef.current, {
      type: 'slide',
      direction: 'down',
      duration: 0.4
    }), '-=0.3');

    return () => {
      tl.kill();
    };
  }, [containerRef, contentRef, headerRef, project, animate]);
};