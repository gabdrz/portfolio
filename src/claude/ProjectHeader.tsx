// src/components/project/ProjectHeader.tsx
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

interface ProjectHeaderProps {
  title: string;
  onClose: () => void;
  showTitle: boolean;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  onClose,
  showTitle,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (closeButtonRef.current) {
      const button = closeButtonRef.current;

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
  }, []);

  return (
    <div className="w-full backdrop-blur-sm bg-[#0D1115]/90 h-14 flex items-center fixed top-0 right-0 z-50 px-4 md:px-0">
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
      </div>
    </div>
  );
};
