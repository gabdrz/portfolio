// src/types/scroll.ts
export interface ScrollState {
  isDragging: { current: boolean };
  startY: { current: number };
  scrollTop: { current: number };
}

export interface ScrollHandlers {
  getSnapPosition: (currentScroll: number) => number;
  getNextSnapPosition: (direction: 1 | -1) => number;
  scrollToPosition: (targetPosition: number) => void;
}