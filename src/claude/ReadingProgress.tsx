import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ReadingProgressProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fromColor: string;
  toColor: string;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({
  targetRef,
  fromColor,
  toColor,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current || !progressRef.current) return;

    const content = targetRef.current;
    const progressBar = progressRef.current;

    const updateProgress = () => {
      const scrollTop = content.scrollTop;
      const scrollHeight = content.scrollHeight;
      const clientHeight = content.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      // Animate progress bar height with GSAP
      gsap.to(progressBar, {
        height: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onScroll = () => {
      updateProgress();
    };

    content.addEventListener("scroll", onScroll);

    // Initial update
    updateProgress();

    return () => {
      content.removeEventListener("scroll", onScroll);
    };
  }, [targetRef]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "4px",
        height: "100%",
        backgroundColor: fromColor,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div
        ref={progressRef}
        style={{
          width: "100%",
          height: "0%",
          backgroundColor: toColor,
        }}
      ></div>
    </div>
  );
};

export default ReadingProgress;
