// src/components/cards/LinksCard.tsx
import React, { useRef } from "react";
import { LinksCard as LinksCardType } from "../../types/cards";
import { useHoverAnimation } from "../../hooks/useHoverAnimation";

interface LinksCardProps {
  card: LinksCardType;
}

const LinksCard: React.FC<LinksCardProps> = ({ card }) => {
  const { layout, links } = card;
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
    <div className="flex w-full h-full items-center justify-center p-8 select-none touch-none">
      <div
        className={`flex ${
          layout === "vertical"
            ? "flex-col space-y-6"
            : "flex-row space-x-10 md:space-x-12"
        } items-center justify-center w-full`}
      >
        <a
          ref={emailRef}
          href={`mailto:${links.email}`}
          className="text-sm md:text-base text-[#CCDAE5]"
        >
          Email
        </a>
        <a
          ref={githubRef}
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-[#CCDAE5]"
        >
          GitHub
        </a>
        <a
          ref={linkedinRef}
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-[#CCDAE5]"
        >
          LinkedIn
        </a>
        <a
          ref={resumeRef}
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-[#CCDAE5]"
        >
          Resume
        </a>
      </div>
    </div>
  );
};

export { LinksCard };
