import React, { useRef } from 'react';
import { NavItem } from './NavItem';
import { useNavAnimations } from '../../hooks/useNavAnimation';
import { useNavState } from '../../hooks/useNavState';

interface SideNavProps {
  cards: Array<{
    id: number;
    type: string;
    title?: string;
  }>;
  containerRef: React.RefObject<HTMLDivElement>;
  activeIndex: number;
}

const SideNav = ({ cards, containerRef, activeIndex }: SideNavProps) => {
  // Single ref array for nav items
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation state and handlers
  const {
    handleExpand,
    handleItemHover,
    handleItemClick
  } = useNavState({ 
    containerRef, 
    activeIndex 
  });

  // Animation controls
  const { animateItems } = useNavAnimations({
    itemRefs,
    activeIndex
  });

  const handleItemMouseEnter = (index: number) => {
    handleExpand(true);
    handleItemHover(index);
    animateItems(true);
  };

  const handleItemMouseLeave = () => {
    handleExpand(false);
    animateItems(false);
  };

  const handleItemClickEvent = (index: number) => {
    handleItemClick(index);
    animateItems(false);
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 select-none">
      <div className="flex flex-col items-end">
        {cards.map((card, index) => (
          <NavItem
            key={card.id}
            title={card.title || (card.type === 'links' ? 'Links' : `Card ${index + 1}`)}
            isActive={index === activeIndex}
            itemRef={el => itemRefs.current[index] = el}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onMouseLeave={handleItemMouseLeave}
            onClick={() => handleItemClickEvent(index)}
          />
        ))}
      </div>
    </nav>
  );
};

export default SideNav;