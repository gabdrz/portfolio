// src/components/cards/LinksCard.tsx
import React, { forwardRef, useRef } from "react";
import { LinksCard as LinksCardType } from "../../types/cards";
import { useHoverAnimation } from "../../hooks/useHoverAnimation";

interface LinksCardProps {
  card: LinksCardType;
}

export const LinksCard = forwardRef<HTMLDivElement, LinksCardProps>(
  ({ card }, ref) => {
    const { links } = card;
    const emailRef = useRef<HTMLAnchorElement>(null);
    const githubRef = useRef<HTMLAnchorElement>(null);
    const linkedinRef = useRef<HTMLAnchorElement>(null);
    const resumeRef = useRef<HTMLAnchorElement>(null);

    useHoverAnimation(emailRef, {
      color: { value: "#2563eb", reset: "#CCDAE5" },
    });
    useHoverAnimation(githubRef, {
      color: { value: "#2563eb", reset: "#CCDAE5" },
    });
    useHoverAnimation(linkedinRef, {
      color: { value: "#2563eb", reset: "#CCDAE5" },
    });
    useHoverAnimation(resumeRef, {
      color: { value: "#2563eb", reset: "#CCDAE5" },
    });

    return (
      <div 
        ref={ref}
        className="flex w-full h-full items-center justify-center p-8 select-none touch-none will-change-transform"
      >
        <div
          className={`flex flex-col space-y-6 items-center justify-center w-full`}
        >
          <a
            ref={emailRef}
            href={`mailto:${links.email}`}
            className="text-sm md:text-base text-[#CCDAE5]"
          >
            {links.email}
          </a>
          <a
            ref={githubRef}
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-[#CCDAE5]"
          >
            GitHub.com/gabdrz
          </a>
          <a
            ref={linkedinRef}
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-[#CCDAE5]"
          >
            LinkedIn.com/gabriel-zafra
          </a>
          <a
            ref={resumeRef}
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-[#CCDAE5]"
          >
            Resume.pdf
          </a>
        </div>
      </div>
    );
  }
);

LinksCard.displayName = 'LinksCard';