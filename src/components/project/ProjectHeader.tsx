import React, { useEffect, useRef } from "react";
import { X, ArrowUp } from "lucide-react";
import gsap from "gsap";

interface ProjectHeaderProps {
  title: string;
  onClose: () => void;
  onScrollToTop: () => void;
  showTitle: boolean;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  onClose,
  onScrollToTop,
  showTitle,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const scrollTopButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  // Setup initial states and context
  useEffect(() => {
    if (!headerRef.current || !backgroundRef.current || !titleRef.current || !scrollTopButtonRef.current) return;

    // Create GSAP context for better animation management
    animationRef.current = gsap.context(() => {
      // Force hardware acceleration
      gsap.set(headerRef.current, {
        transform: "translateZ(0)",
        willChange: "transform"
      });

      // Set initial states
      gsap.set(backgroundRef.current, { 
        backgroundColor: "rgba(13,17,21,0)",
        backdropFilter: "blur(0px)" 
      });
      gsap.set(titleRef.current, { 
        opacity: 0,
        y: 20
      });
      gsap.set(scrollTopButtonRef.current, { 
        opacity: 0,
        xPercent: 100,
        display: "none"
      });
      gsap.set(buttonsContainerRef.current, {
        width: "auto"
      });
    });

    return () => animationRef.current?.revert();
  }, []);

  // Handle scroll-based animations
  useEffect(() => {
    if (!backgroundRef.current || !titleRef.current || !scrollTopButtonRef.current || !buttonsContainerRef.current) return;

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([
      backgroundRef.current, 
      titleRef.current, 
      scrollTopButtonRef.current,
      buttonsContainerRef.current
    ]);

    const timeline = gsap.timeline({
      defaults: { duration: 0.2, ease: "power2.out" }
    });

    if (showTitle) {
      timeline
        .to(backgroundRef.current, {
          backgroundColor: "rgba(13,17,21,0.3)",
          backdropFilter: "blur(24px)",
        })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
        }, "-=0.2")
        // Set up scroll button to appear
        .set(scrollTopButtonRef.current, {
          display: "flex",
          opacity: 0,
          xPercent: 100
        })
        // Expand the buttons container
        .to(buttonsContainerRef.current, {
          width: "auto",
          duration: 0.3,
        })
        // Animate scroll button
        .to(scrollTopButtonRef.current, {
          opacity: 1,
          xPercent: 0,
          duration: 0.3,
        }, "-=0.2");
    } else {
      timeline
        .to([titleRef.current, scrollTopButtonRef.current], {
          opacity: 0,
          xPercent: (index) => index === 1 ? 100 : 0,  // Only move scroll button
          y: (index) => index === 0 ? 20 : 0,  // Only move title
        })
        .to(buttonsContainerRef.current, {
          width: "auto",
        }, "-=0.15")
        .to(backgroundRef.current, {
          backgroundColor: "rgba(13,17,21,0)",
          backdropFilter: "blur(0px)",
        }, "-=0.1")
        .set(scrollTopButtonRef.current, {
          display: "none"
        });
    }

    return () => timeline.kill();
  }, [showTitle]);

  return (
    <div ref={headerRef} className="fixed top-0 right-0 z-50 w-full">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 transition-[backdrop-filter] duration-300"
      />
      <div className="relative h-14 flex items-center justify-center px-9">
        <div className="w-full max-w-2xl mx-auto h-full flex items-center justify-between">
          <p
            ref={titleRef}
            className="text-lg font-bold truncate text-white"
          >
            {title}
          </p>
          
          <div 
            ref={buttonsContainerRef}
            className="flex items-center gap-3 overflow-hidden"
          >
            <button
              ref={scrollTopButtonRef}
              onClick={onScrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="text-white" />
            </button>
            
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Close project"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};