// src/components/project/blocks/ProjectImage.tsx
import React from 'react';

interface ProjectImageProps {
  content: string;
  layout: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ content, layout }) => (
  <div className={`mb-12 ${layout === "contained" ? "max-w-2xl mx-auto" : "w-full"}`}>
    <img src={content} alt="" className="w-full h-auto rounded-lg" />
  </div>
);