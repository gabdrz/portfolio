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
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);

  const project = cards.find(
    (card) => "projectData" in card && card.id.toString() === id
  );

  const state = location.state as LocationState;

  useEffect(() => {
    if (!project || !state?.transitionId) return;

    const sourceImage = document.getElementById(state.transitionId);
    if (!sourceImage) return;

    // Add blocks to the beginning of content if they don't exist
    if (
      !project.projectData.content.some((block) => block.type === "heading")
    ) {
      project.projectData.content.unshift({
        type: "heading",
        content: project.title,
        layout: "contained",
      });
    }

    if (
      !project.projectData.content.some(
        (block) => block.type === "image" && block.content === project.image
      )
    ) {
      project.projectData.content.splice(1, 0, {
        type: "image",
        content: project.image,
        layout: "contained",
      });
    }

    // Create transition clone
    const clone = sourceImage.cloneNode(true) as HTMLElement;
    clone.style.position = "fixed";
    clone.style.zIndex = "100";
    clone.style.transform = "translateZ(0)";
    clone.style.top = `${state.sourceMetrics.top}px`;
    clone.style.left = `${state.sourceMetrics.left}px`;
    clone.style.width = `${state.sourceMetrics.width}px`;
    clone.style.height = `${state.sourceMetrics.height}px`;
    clone.style.borderRadius = state.sourceMetrics.borderRadius;
    clone.style.transformOrigin = "top left";
    clone.style.transition = "none";
    document.body.appendChild(clone);

    // Calculate target position
    const targetWidth = Math.min(window.innerWidth * 0.8, 896);
    const targetHeight =
      (targetWidth * state.sourceMetrics.height) / state.sourceMetrics.width;
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = headerHeight + 48;

    // Create a GSAP timeline for coordinated animations
    const tl = gsap.timeline();

    // Animate the clone
    tl.to(clone, {
      top: targetTop,
      left: targetLeft,
      width: targetWidth,
      height: targetHeight,
      borderRadius: "0.5rem",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        clone.remove();
        if (contentRef.current) {
          contentRef.current.style.opacity = "1";
        }
      },
    })
    // Fade in the gradient background
    .to(backgroundRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut",
    }, "-=0.2"); // Start slightly before the clone animation finishes

    // Fade in content
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        "-=0.2"
      );
    }
  }, [project, state, headerHeight]);

  const handleClose = () => {
    if (!containerRef.current || !contentRef.current || !headerRef.current) {
      navigate("/");
      return;
    }

    const targetId = state?.transitionId;
    const targetElement = targetId ? document.getElementById(targetId) : null;
    const sourceImage = contentRef.current.querySelector("img") as HTMLElement;

    if (targetElement && sourceImage) {
      const sourceRect = sourceImage.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      // Create transition clone
      const clone = sourceImage.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.zIndex = "100";
      clone.style.transform = "translateZ(0)";
      clone.style.top = `${sourceRect.top}px`;
      clone.style.left = `${sourceRect.left}px`;
      clone.style.width = `${sourceRect.width}px`;
      clone.style.height = `${sourceRect.height}px`;
      clone.style.borderRadius = "0.5rem";
      clone.style.transformOrigin = "top left";
      clone.style.transition = "none";
      document.body.appendChild(clone);

      // Hide original image
      sourceImage.style.opacity = "0";

      // Create timeline for smooth exit
      const tl = gsap.timeline({
        onComplete: () => {
          navigate("/");
          clone.remove();
        },
      });

      // Fade out content and background together
      tl.to([contentRef.current, headerRef.current, backgroundRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        clone,
        {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: state?.sourceMetrics?.borderRadius || "0px",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    } else {
      // Fallback animation
      gsap.to([contentRef.current, headerRef.current, backgroundRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => navigate("/"),
      });
    }
  };

  // Use background hook
  const theme = project?.projectData.theme;
  useProjectBackground({
    fromColor: theme?.gradient?.from || "#0D1115",
    toColor: theme?.gradient?.to || "#0D1115",
    contentRef,
    containerRef,
    backgroundRef,
  });

  // Handle scroll for header title
  useEffect(() => {
    if (!headerRef.current) return;

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };

    const content = contentRef.current;

    const handleScroll = () => {
      if (!content) return;
      const titleBlock = content.querySelector('[data-block="title"]');
      if (titleBlock) {
        const titleBottom = titleBlock.getBoundingClientRect().bottom;
        setShowHeaderTitle(titleBottom < headerHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    
    if (content) {
      content.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      if (content) {
        content.removeEventListener("scroll", handleScroll);
      }
    };
  }, [headerHeight]);

  if (!project || !("projectData" in project)) {
    return null;
  }

  const textColor = theme?.textColor || "#CCDAE5";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-50"
      style={{ color: textColor }}
    >
      {/* Gradient Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-20">
        <ProjectHeader
          title={project.title}
          onClose={handleClose}
          showTitle={showHeaderTitle}
        />
      </div>
      <div
        ref={contentRef}
        className="relative h-full overflow-y-auto px-4 md:px-8 scrollbar-hide z-10"
        style={{ paddingTop: `${headerHeight + 32}px`, opacity: 0 }}
      >
        {project.projectData.content.map((block, index) => (
          <ProjectContent
            key={index}
            block={block}
            isFirstBlock={index === 0}
            projectData={project.projectData}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectView;