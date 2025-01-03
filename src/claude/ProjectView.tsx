import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { cards } from "../../data/cards";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectContent } from "./ProjectContent";
import { useProjectBackground } from "../../hooks/useProjectBackground";
import { useProjectHeader } from "../../hooks/useProjectHeader";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import ReadingProgress from "./ReadingProgress";

const ProjectView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { showHeaderTitle } = useProjectHeader(contentRef, headerRef);
  const scrollToTop = useScrollToTop(contentRef);

  const project = cards.find(
    (card) => "projectData" in card && card.id.toString() === id
  );

  useEffect(() => {
    if (
      !project ||
      !contentRef.current ||
      !backgroundRef.current ||
      !headerRef.current
    )
      return;

    const tl = gsap.timeline();

    // Initial states
    gsap.set([contentRef.current, headerRef.current], { opacity: 0 });
    gsap.set(backgroundRef.current, { opacity: 0 });

    // Fade in animation sequence
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      [contentRef.current, headerRef.current],
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.1"
    );
  }, [project]);

  const onClose = () => {
    const tl = gsap.timeline({
      onComplete: () => navigate("/"),
    });

    // Fade out animation sequence
    tl.to([contentRef.current, headerRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      backgroundRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );
  };

  const theme = project?.projectData.theme;

  useSmoothScroll(contentRef, {
    friction: 0.92,
    acceleration: 0.08,
    velocityThreshold: 0.05,
  });

  useProjectBackground({
    fromColor: theme?.gradient?.from || "#0D1115",
    toColor: theme?.gradient?.to || "#0D1115",
    contentRef,
    containerRef,
    backgroundRef,
  });

  if (!project || !("projectData" in project)) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-50"
      style={{ color: theme?.textColor || "#CCDAE5" }}
    >
      <ReadingProgress
        targetRef={contentRef}
        fromColor={theme?.gradient?.from || "#0D1115"}
        toColor={theme?.gradient?.to || "#0D1115"}
      />
      <div
        ref={backgroundRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: theme?.gradient?.from || "#0D1115",
        }}
      />
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-20">
        <ProjectHeader
          title={project.title}
          onClose={onClose}
          onScrollToTop={scrollToTop}
          showTitle={showHeaderTitle}
        />
      </div>
      <div
        ref={contentRef}
        className="relative h-full overflow-y-scroll px-9 md:px-9 scrollbar-hide z-10"
        style={{ paddingTop: "80px", paddingBottom: "120px", opacity: 0 }}
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
