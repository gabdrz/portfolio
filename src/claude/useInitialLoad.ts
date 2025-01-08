// src/hooks/useInitialLoad.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LoadingState {
  isBackgroundLoaded: boolean;
  isProfileLoaded: boolean;
  areLinksLoaded: boolean;
  areProjectsLoaded: boolean;
  isFullyLoaded: boolean;
}

interface AnimationRefs {
  profileRef: React.RefObject<HTMLDivElement>;
  linksRef: React.RefObject<HTMLDivElement>;
  headerRefs: React.RefObject<HTMLDivElement>[];
  projectRefs: React.RefObject<HTMLDivElement>[];
}

export const useInitialLoad = (refs: AnimationRefs) => {
  // Track loading states
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isBackgroundLoaded: false,
    isProfileLoaded: false,
    areLinksLoaded: false,
    areProjectsLoaded: false,
    isFullyLoaded: false,
  });

  // Track if initial animation has run
  const hasAnimatedRef = useRef(false);

  // Timeline reference for cleanup
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Update individual loading states
  const setLoaded = useCallback((key: keyof LoadingState) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: true
    }));
  }, []);

  // Main animation sequence
  const startAnimationSequence = useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create new timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded('isFullyLoaded');
      }
    });
    timelineRef.current = tl;

    // Set initial states
    gsap.set([
      refs.profileRef.current,
      refs.linksRef.current,
      ...refs.headerRefs.map(ref => ref.current),
      ...refs.projectRefs.map(ref => ref.current)
    ], { opacity: 0, y: 20 });

    // Profile card animation
    if (refs.profileRef.current) {
      tl.to(refs.profileRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setLoaded('isProfileLoaded')
      });
    }

    // Links animation
    if (refs.linksRef.current) {
      tl.to(refs.linksRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => setLoaded('areLinksLoaded')
      }, "-=0.3");
    }

    // Header animations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refs.headerRefs.forEach((ref, index) => {
      if (!ref.current) return;
      tl.to(ref.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");
    });

    // Project animations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refs.projectRefs.forEach((ref, index) => {
      if (!ref.current) return;
      tl.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.2");
    });

    // Mark projects as loaded at the end
    tl.call(() => setLoaded('areProjectsLoaded'));

  }, [refs, setLoaded]);

  // Handle background loaded callback
  const onBackgroundLoaded = useCallback(() => {
    setLoaded('isBackgroundLoaded');
    startAnimationSequence();
  }, [setLoaded, startAnimationSequence]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return {
    loadingState,
    onBackgroundLoaded,
    isLoading: !loadingState.isFullyLoaded
  };
};