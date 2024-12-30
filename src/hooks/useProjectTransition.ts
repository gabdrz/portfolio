// src/hooks/useProjectTransition.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export const useProjectTransition = () => {
  const navigate = useNavigate();

  const handleClose = useCallback(
    (refs: {
      container: React.RefObject<HTMLDivElement>;
      content: React.RefObject<HTMLDivElement>;
      header: React.RefObject<HTMLDivElement>;
      background: React.RefObject<HTMLDivElement>;
    }) => {
      const { container, content, header, background } = refs;

      if (!container.current || !content.current || !header.current) {
        navigate("/");
        return;
      }

      // Simple fallback fade-out animation
      gsap.to([content.current, header.current, background.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => navigate("/"),
      });
    },
    [navigate]
  );

  return { handleClose };
};
