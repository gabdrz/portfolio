// src/components/project/ProjectView.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import gsap from "gsap";
import { cards } from "../../data/cards";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectContent } from "./ProjectContent";
import { useProjectBackground } from "../../hooks/useProjectBackground";

interface LocationState {
  transitionId: string;
  sourceMetrics: {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
  };
}

const ProjectView: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  // Find the project data
  const project = cards.find(
    (card) => "projectData" in card && card.id.toString() === id
  );

  const state = location.state as LocationState;

  useEffect(() => {
    if (!project || !state?.transitionId || !state?.sourceMetrics) return;

    const sourceImage = document.getElementById(state.transitionId);
    const targetImage = heroImageRef.current;
    
    if (!sourceImage || !targetImage) return;

    // Clone the source image for transition
    const clone = sourceImage.cloneNode(true) as HTMLImageElement;
    clone.style.position = 'fixed';
    clone.style.zIndex = '100';
    clone.style.transformOrigin = 'top left';
    clone.style.top = `${state.sourceMetrics.top}px`;
    clone.style.left = `${state.sourceMetrics.left}px`;
    clone.style.width = `${state.sourceMetrics.width}px`;
    clone.style.height = `${state.sourceMetrics.height}px`;
    clone.style.borderRadius = state.sourceMetrics.borderRadius;
    clone.style.willChange = 'transform, width, height';
    
    document.body.appendChild(clone);

    // Get target metrics
    const targetMetrics = targetImage.getBoundingClientRect();

    // Animate clone to target position using GSAP
    gsap.to(clone, {
      top: targetMetrics.top,
      left: targetMetrics.left,
      width: targetMetrics.width,
      height: targetMetrics.height,
      borderRadius: 8,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        clone.remove();
        if (targetImage) {
          gsap.to(targetImage, {
            opacity: 1,
            duration: 0.2
          });
        }
      }
    });

    return () => {
      clone.remove();
    };
  }, [project, state]);

  const handleClose = () => {
    if (!containerRef.current || !contentRef.current || !headerRef.current || !heroImageRef.current) {
      navigate("/");
      return;
    }

    const targetId = state?.transitionId;
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (targetElement) {
      const targetMetrics = targetElement.getBoundingClientRect();
      const sourceMetrics = heroImageRef.current.getBoundingClientRect();
      
      // Clone the current hero image
      const clone = heroImageRef.current.cloneNode(true) as HTMLImageElement;
      clone.style.position = 'fixed';
      clone.style.zIndex = '100';
      clone.style.top = `${sourceMetrics.top}px`;
      clone.style.left = `${sourceMetrics.left}px`;
      clone.style.width = `${sourceMetrics.width}px`;
      clone.style.height = `${sourceMetrics.height}px`;
      clone.style.borderRadius = '8px';
      clone.style.transformOrigin = 'top left';
      clone.style.willChange = 'transform, width, height';
      
      document.body.appendChild(clone);

      // Hide original elements
      heroImageRef.current.style.opacity = '0';
      
      // Animate other elements out
      const tl = gsap.timeline({
        onComplete: () => {
          navigate("/");
          clone.remove();
        }
      });

      tl.to([contentRef.current, headerRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .to(clone, {
        top: targetMetrics.top,
        left: targetMetrics.left,
        width: targetMetrics.width,
        height: targetMetrics.height,
        borderRadius: state?.sourceMetrics?.borderRadius || '0px',
        duration: 0.5,
        ease: "power2.inOut"
      }, "-=0.2");
    } else {
      // Fallback animation if target element is not found
      gsap.to([contentRef.current, headerRef.current], {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => navigate("/")
      });
    }
  };

  // Use background hook
  const theme = project?.projectData.theme;
  useProjectBackground({
    fromColor: theme?.gradient?.from || '#0D1115',
    toColor: theme?.gradient?.to || '#0D1115',
    contentRef,
    containerRef
  });

  // Handle scroll for header title
  useEffect(() => {
    if (!headerRef.current) return;
    
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };

    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const titleBlock = contentRef.current.querySelector('[data-block="title"]');
      if (titleBlock) {
        const titleBottom = titleBlock.getBoundingClientRect().bottom;
        setShowHeaderTitle(titleBottom < headerHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    contentRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      contentRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [headerHeight]);

  if (!project || !("projectData" in project)) {
    return null;
  }

  const textColor = theme?.textColor || "#CCDAE5";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-50 bg-[#0D1115]"
      style={{ color: textColor }}
    >
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-10">
        <ProjectHeader
          title={project.title}
          onClose={handleClose}
          showTitle={showHeaderTitle}
        />
      </div>

      <div
        ref={contentRef}
        className="h-full overflow-y-auto px-8 scrollbar-hide"
        style={{ paddingTop: `${headerHeight + 32}px` }}
      >
        <div className="max-w-2xl mx-auto mb-12">
          <img
            ref={heroImageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-auto rounded-lg opacity-0"
            style={{ opacity: 0 }}
          />
        </div>

        {project.projectData.content.map((block, index) => (
          <ProjectContent
            key={index}
            block={block}
            isFirstBlock={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectView;