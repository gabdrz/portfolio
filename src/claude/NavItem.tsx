import React from 'react';

interface NavItemProps {
  title: string;
  isActive: boolean;
  itemRef: (el: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  title,
  itemRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div 
      ref={itemRef}
      className="flex items-center justify-end cursor-pointer py-1 rounded-lg"
      style={{ width: '32px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className="mr-4 px-2 py-1 rounded text-sm whitespace-nowrap pointer-events-none text-[#CCDAE5]"
        style={{ opacity: 0 }}
      >
        {title}
      </div>
      <div 
        className="w-2 h-2 rounded-full flex-shrink-0 mr-2 pointer-events-none"
        style={{
          backgroundColor: '#CCDAE5',
          opacity: 0.5,
        }}
      />
    </div>
  );
};