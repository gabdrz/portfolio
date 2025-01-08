import React, { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useBackgroundStore } from "../store/backgroundStore";

interface BackgroundProps {
  onAnimationComplete?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const Background = ({ onAnimationComplete, containerRef }: BackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animationFrameRef = useRef<number>();

  const {
    isProjectView,
    isTransitioning,
    getCurrentColors,
    setTransitioning,
    setTransitionProgress,
    cardViewFromColor,
    cardViewToColor,
    projectViewFromColor,
    projectViewToColor,
  } = useBackgroundStore();

  const { fromColor, toColor } = getCurrentColors();

  const interpolateColor = useCallback(
    (color1: string, color2: string, progress: number) => {
      const parseHex = (hex: string) => parseInt(hex, 16);
      const r1 = parseHex(color1.slice(1, 3));
      const g1 = parseHex(color1.slice(3, 5));
      const b1 = parseHex(color1.slice(5, 7));
      const r2 = parseHex(color2.slice(1, 3));
      const g2 = parseHex(color2.slice(3, 5));
      const b2 = parseHex(color2.slice(5, 7));
      const r = Math.round(r1 + (r2 - r1) * progress);
      const g = Math.round(g1 + (g2 - g1) * progress);
      const b = Math.round(b1 + (b2 - b1) * progress);
      return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    },
    []
  );

  const updateBackgroundGradient = useCallback(
    (progress: number) => {
      if (!backgroundRef.current) return;

      const fromColorStart = isProjectView
        ? cardViewFromColor
        : projectViewFromColor;
      const fromColorEnd = isProjectView
        ? projectViewFromColor
        : cardViewFromColor;
      const toColorStart = isProjectView ? cardViewToColor : projectViewToColor;
      const toColorEnd = isProjectView ? projectViewToColor : cardViewToColor;

      const currentFromColor = interpolateColor(
        fromColorStart,
        fromColorEnd,
        progress
      );
      const currentToColor = interpolateColor(
        toColorStart,
        toColorEnd,
        progress
      );

      backgroundRef.current.style.background = `linear-gradient(to bottom, ${currentFromColor}, ${currentToColor})`;
    },
    [
      isProjectView,
      cardViewFromColor,
      cardViewToColor,
      projectViewFromColor,
      projectViewToColor,
      interpolateColor,
    ]
  );

  useEffect(() => {
    const background = backgroundRef.current;
    const gradient = gradientRef.current;

    if (!background || !gradient || hasPlayedRef.current) return;

    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline({
        onComplete: onAnimationComplete,
        paused: true,
      });

      gsap.set([background, gradient], { opacity: 0 });

      timelineRef.current
        .to(background, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(
          gradient,
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.3"
        );
    }

    if (!hasPlayedRef.current) {
      timelineRef.current.play();
      hasPlayedRef.current = true;
    }
  }, [onAnimationComplete]);

  useEffect(() => {
    if (!isTransitioning || !backgroundRef.current) return;

    const duration = 0.6;
    const ease = "power2.inOut";

    gsap.to(
      {},
      {
        duration,
        ease,
        onUpdate: function () {
          const progress = this.progress();
          updateBackgroundGradient(progress);
          setTransitionProgress(progress);
        },
        onComplete: () => setTransitioning(false),
      }
    );
  }, [
    isTransitioning,
    setTransitioning,
    setTransitionProgress,
    updateBackgroundGradient,
  ]);

  useEffect(() => {
    if (!isTransitioning || !backgroundRef.current) return;

    const duration = 0.6;
    const ease = "power2.inOut";

    // Prevent scroll updates during transition
    const disableScrollUpdate = () =>
      isTransitioning ? null : updateBackgroundGradient;

    gsap.to(
      {},
      {
        duration,
        ease,
        onUpdate: function () {
          const progress = this.progress();
          updateBackgroundGradient(progress);
          setTransitionProgress(progress);
        },
        onComplete: () => {
          setTransitioning(false);
        },
      }
    );

    return () => {
      // Re-enable scroll updates after transition
      disableScrollUpdate();
    };
  }, [
    isTransitioning,
    setTransitioning,
    setTransitionProgress,
    updateBackgroundGradient,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning) return; // Skip updates during transitions
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(
        updateBackgroundGradient
      );
    };

    if (containerRef?.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef?.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [containerRef, updateBackgroundGradient, isTransitioning]);

  return (
    <>
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-[-2]"
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
      <div
        ref={gradientRef}
        className="fixed inset-0 z-[-1]"
        style={{
          background: `
            radial-gradient(
              circle at top left,
              rgba(29, 78, 216, 0.15),
              transparent 80%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
        }}
      />
    </>
  );
};

export default Background;
