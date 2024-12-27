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
    <div className="w-full backdrop-blur-sm bg-[#0D1115]">
      <div className="max-w-2xl mx-auto h-14 flex items-center justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Close project"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p
            ref={titleRef}
            className="text-lg font-bold truncate"
            style={{
              opacity: 0,
              transform: "translateY(10px)",
            }}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};
