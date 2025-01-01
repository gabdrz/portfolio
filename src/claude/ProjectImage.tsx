interface ProjectImageProps {
  content: string;
  layout: string;
  alt?: string;  // Add this
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ content }) => (
  <div className={`
    mb-12 
    max-w-3xl mx-auto
    w-full
  `}>
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <img 
        src={content} 
        alt=""
        className="w-full h-auto object-cover" 
      />
    </div>
  </div>
);