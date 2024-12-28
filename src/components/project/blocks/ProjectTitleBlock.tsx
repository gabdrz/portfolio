// src/components/project/blocks/ProjectTitleBlock.tsx
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectData } from '../../../types/cards';

interface ProjectTitleBlockProps {
  content: string;
  projectData: ProjectData;
}

export const ProjectTitleBlock: React.FC<ProjectTitleBlockProps> = ({ 
  content,
  projectData 
}) => (
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
            href={projectData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Github size={20} />
            <span className="text-sm">View Code</span>
          </a>
        )}
        {projectData.liveUrl && (
          <a
            href={projectData.liveUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={20} />
            <span className="text-sm">View Live</span>
          </a>
        )}
      </div>
    </div>
  </div>
);