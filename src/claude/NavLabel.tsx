// NavLabel.tsx
import React, { forwardRef } from 'react';

interface NavLabelProps {
  title: string;
}

export const NavLabel = forwardRef<HTMLDivElement, NavLabelProps>(({ 
  title 
}, ref) => (
  <div
    ref={ref}
    className="mr-4 px-2 py-1 rounded text-sm text-[#CCDAE5] whitespace-nowrap pointer-events-none"
    style={{ opacity: 0 }} // Move from className to style to allow GSAP override
  >
    {title}
  </div>
));