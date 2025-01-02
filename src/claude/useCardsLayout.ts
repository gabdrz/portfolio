// src/hooks/useCardsLayout.ts
import { useViewportHeight } from "./useViewportHeight";

interface UseCardsLayoutProps {
  isMobile: boolean;
  isProjectView: boolean;
}

export const useCardsLayout = ({
  isMobile,
  isProjectView,
}: UseCardsLayoutProps) => {
  console.log("Layout values:", { isMobile, isProjectView });
  const viewportHeight = useViewportHeight();
  console.log("viewportHeight:", viewportHeight);

  const containerStyle = {
    height: `${viewportHeight}px`,
    ...(!isMobile
      ? {
          scrollbarWidth: "none" as const,
          msOverflowStyle: "none" as const,
        }
      : {}),
  };

  const containerClasses = `
    w-full 
    overflow-hidden scrollbar-hide touch-none
    ${!isMobile ? "select-none" : ""}
    ${isProjectView ? "pointer-events-none" : ""}
  `;

  const cardItemClasses =
    "card-item w-full h-1/3 flex items-center justify-center";

  return {
    containerStyle,
    containerClasses,
    cardItemClasses,
  };
};
