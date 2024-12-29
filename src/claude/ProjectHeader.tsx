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

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: showTitle ? 1 : 0,
        y: showTitle ? 0 : -10,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [showTitle]);

  return (
    <div className="w-full backdrop-blur-sm bg-[#0D1115]/90 h-14 flex items-center">
      <div className="relative max-w-2xl w-full mx-auto h-full">
        {/* Close Button - Absolute positioned */}
        <button
          onClick={onClose}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close project"
        >
          <X size={24} />
        </button>

        {/* Title - Centered */}
        <div className="flex items-center justify-center h-full">
          <p
            ref={titleRef}
            className="text-lg font-bold truncate"
            style={{
              opacity: 0,
              transform: "translateY(-10px)",
            }}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};