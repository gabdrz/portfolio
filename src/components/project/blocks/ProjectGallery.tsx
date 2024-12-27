// src/components/project/blocks/ProjectGallery.tsx
import React from 'react';

interface ProjectGalleryProps {
  content: string;
  layout: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ content, layout }) => {
  const images = content.split(",");
  return (
    <div className={`mb-12 grid grid-cols-1 md:grid-cols-3 gap-4 ${
      layout === "contained" ? "max-w-2xl mx-auto" : "w-full"
    }`}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          className="w-full h-64 object-cover rounded-lg"
        />
      ))}
    </div>
  );
};