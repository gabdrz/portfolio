// src/components/project/blocks/ProjectHeading.tsx
import React from 'react';

interface ProjectHeadingProps {
  content: string;
  layout: string;
}

export const ProjectHeading: React.FC<ProjectHeadingProps> = ({ content, layout }) => (
  <div className={`mb-8 ${layout === "contained" ? "max-w-2xl mx-auto" : "w-full"}`}>
    <p className="text-2xl md:text-2xl font-bold">{content}</p>
  </div>
);