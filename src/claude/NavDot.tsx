// src/components/nav/NavDot.tsx

interface NavDotProps {
  isActive: boolean;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const NavDot = forwardRef<HTMLDivElement, NavDotProps>(({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseEnter,
  onMouseLeave
}, ref) => {
  return (
    <div 
      className="flex-shrink-0 mr-2 py-2"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={ref} className={`rounded-full bg-[#CCDAE5] ${isMobile ? 'w-3 h-3' : 'w-2 h-2'}`} />
    </div>
  );
});