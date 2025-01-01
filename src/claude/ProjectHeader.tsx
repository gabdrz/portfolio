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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollTopButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    // Force hardware acceleration
    headerRef.current.style.transform = "translateZ(0)";
    headerRef.current.style.willChange = "transform";

    // Force a repaint
    void headerRef.current.offsetHeight;
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: showTitle ? 1 : 0,
        y: showTitle ? 0 : -10,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [showTitle]);

  const setupButtonAnimation = (
    buttonRef: React.RefObject<HTMLButtonElement>
  ) => {
    if (buttonRef.current) {
      const button = buttonRef.current;

      const handleHover = () => {
        gsap.to(button, {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(button, {
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleHover);
      button.addEventListener("mouseleave", handleLeave);

      return () => {
        button.removeEventListener("mouseenter", handleHover);
        button.removeEventListener("mouseleave", handleLeave);
      };
    }
  };

  useEffect(() => {
    const cleanupClose = setupButtonAnimation(closeButtonRef);
    const cleanupScroll = setupButtonAnimation(scrollTopButtonRef);

    return () => {
      cleanupClose?.();
      cleanupScroll?.();
    };
  }, []);

  return (
    <div ref={headerRef} className="fixed top-0 right-0 z-50 w-full">
      <div className="absolute inset-0 bg-[rgba(13,17,21,0.3)] backdrop-blur-xl" />
      <div className="relative h-14 flex items-center px-4 md:px-0">
        <div className="relative max-w-2xl w-full mx-auto h-full px-4 md:px-8">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-lg"
            aria-label="Close project"
          >
            <X size={24} />
          </button>

          <div className="flex items-center justify-center h-full">
            <p
              ref={titleRef}
              className="text-lg font-bold truncate"
              style={{ opacity: 0, transform: "translateY(-10px)" }}
            >
              {title}
            </p>
          </div>

          <button
            ref={scrollTopButtonRef}
            onClick={onScrollToTop}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
