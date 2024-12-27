// src/utils/navUtils.ts
export const findClosestDotIndex = (clientY: number, itemRefs: (HTMLDivElement | null)[]) => {
    const dotElements = itemRefs
      .map(item => item?.querySelector('.rounded-full'))
      .filter((dot): dot is Element => dot !== null);
  
    const dotRects = dotElements.map(dot => dot.getBoundingClientRect());
    
    return dotRects.reduce((closest, rect, index) => {
      const distance = Math.abs(clientY - (rect.top + rect.height / 2));
      if (distance < closest.distance) {
        return { index, distance };
      }
      return closest;
    }, { index: -1, distance: Infinity }).index;
  };