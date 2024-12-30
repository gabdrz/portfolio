// src/components/project/blocks/ProjectTitleBlock.tsx
import React, { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectData } from '../../../types/cards';
import { useHoverAnimation } from '../../../hooks/useHoverAnimation';

interface ProjectTitleBlockProps {
  content: string;
  projectData: ProjectData;
}

export const ProjectTitleBlock: React.FC<ProjectTitleBlockProps> = ({
  content,
  projectData,
}) => {
  const githubRef = useRef<HTMLAnchorElement>(null);
  const liveRef = useRef<HTMLAnchorElement>(null);

  useHoverAnimation(githubRef, {
    color: { value: '#60A5FA', reset: '#CCDAE5' },
  });

  useHoverAnimation(liveRef, {
    color: { value: '#60A5FA', reset: '#CCDAE5' },
  });

  return (
    <div className="mb-8" data-block="title">
      <p className="text-3xl md:text-4xl font-bold mb-4 text-center">{content}</p>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm opacity-75 mb-4">
          <p>{projectData.type}</p>
          <p>•</p>
          <p>{projectData.status}</p>
        </div>

        <div className="flex gap-4">
          {projectData.githubUrl && (
            <a
              ref={githubRef}
              href={projectData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#CCDAE5]"
            >
              <Github size={20} />
              <span className="text-sm">View Code</span>
            </a>
          )}
          {projectData.liveUrl && (
            <a
              ref={liveRef}
              href={projectData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#CCDAE5]"
            >
              <ExternalLink size={20} />
              <span className="text-sm">View Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
