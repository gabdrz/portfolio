// src/utils/eventHandlers.ts
import { ScrollState, ScrollHandlers } from '../types/scroll';
import gsap from 'gsap';

interface WheelHandlerConfig {
  threshold: number;
  accumulatedDelta: { current: number };
  wheelTimeout: { current: NodeJS.Timeout | null };
}

export const createWheelHandler = (
  handlers: ScrollHandlers,
  config: WheelHandlerConfig
) => (e: WheelEvent) => {
  e.preventDefault();
  config.accumulatedDelta.current += e.deltaY;
  
  if (config.wheelTimeout.current) {
    clearTimeout(config.wheelTimeout.current);
  }
  
  if (Math.abs(config.accumulatedDelta.current) >= config.threshold) {
    const direction = config.accumulatedDelta.current > 0 ? 1 : -1;
    const targetScroll = handlers.getNextSnapPosition(direction as 1 | -1);
    handlers.scrollToPosition(targetScroll);
    config.accumulatedDelta.current = 0;
  }

  config.wheelTimeout.current = setTimeout(() => {
    config.accumulatedDelta.current = 0;
    config.wheelTimeout.current = null;
  }, 150);
};

export const createKeydownHandler = (handlers: ScrollHandlers) => 
  (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const direction = e.key === 'ArrowUp' ? -1 : 1;
      const targetScroll = handlers.getNextSnapPosition(direction);
      handlers.scrollToPosition(targetScroll);
    }
  };

export const createMouseHandlers = (
  container: HTMLDivElement,
  state: ScrollState,
  handlers: ScrollHandlers
) => ({
  mousedown: (e: MouseEvent) => {
    state.isDragging.current = true;
    state.startY.current = e.pageY;
    state.scrollTop.current = container.scrollTop;
    container.style.cursor = 'grabbing';
    gsap.killTweensOf(container);
  },

  mousemove: (e: MouseEvent) => {
    if (!state.isDragging.current) return;
    const deltaY = e.pageY - state.startY.current;
    container.scrollTop = state.scrollTop.current - deltaY;
  },

  mouseup: () => {
    if (!state.isDragging.current) return;
    state.isDragging.current = false;
    container.style.cursor = 'grab';
    const targetScroll = handlers.getSnapPosition(container.scrollTop);
    handlers.scrollToPosition(targetScroll);
  },

  mouseleave: () => {
    if (state.isDragging.current) {
      state.isDragging.current = false;
      container.style.cursor = 'grab';
      const targetScroll = handlers.getSnapPosition(container.scrollTop);
      handlers.scrollToPosition(targetScroll);
    }
  }
});