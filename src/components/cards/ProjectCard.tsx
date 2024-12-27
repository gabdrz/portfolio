// src/components/cards/ProjectCard.tsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard as ProjectCardType } from "../../types/cards";

interface ProjectCardProps {
  card: ProjectCardType;
  onTransitionStart?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ card, onTransitionStart }) => {
  const navigate = useNavigate();
  const transitionId = `project-image-${card.id}`;

  const handleClick = useCallback(() => {
    if (onTransitionStart) {
      onTransitionStart();
    }
    
    // Get the current card element metrics before navigation
    const element = document.getElementById(transitionId);
    if (!element) return;
    
    const metrics = element.getBoundingClientRect();
    
    navigate(`/project/${card.id}`, { 
      state: { 
        transitionId,
        sourceMetrics: {
          top: metrics.top,
          left: metrics.left,
          width: metrics.width,
          height: metrics.height,
          borderRadius: getComputedStyle(element).borderRadius
        }
      }
    });
  }, [card.id, navigate, onTransitionStart, transitionId]);

  return (
    <div 
      className="flex w-full items-start gap-4 md:px-8 cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden">
        <img
          id={transitionId}
          src={card.image}
          alt={card.title}
          className="card-thumbnail w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm md:text-base font-bold text-[#CCDAE5] mb-2">
          {card.title}
        </p>
        <p className="text-sm md:text-base text-[#CCDAE5] opacity-75 mb-2">
          {card.projectData.status}
        </p>
        <p className="text-sm md:text-base text-[#CCDAE5] max-w-2xl">
          {card.subtitle}
        </p>
      </div>
    </div>
  );
};

export { ProjectCard };