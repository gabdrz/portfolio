import { create } from 'zustand';

interface BackgroundState {
  // View state
  isProjectView: boolean;
  fromColor: string;
  toColor: string;

  // Transition state
  isTransitioning: boolean;
  transitionProgress: number;

  // Card view colors
  cardViewFromColor: string;
  cardViewToColor: string;

  // Project view colors
  projectViewFromColor: string;
  projectViewToColor: string;

  // Getters
  getCurrentColors: () => { fromColor: string; toColor: string };

  // Setters
  setProjectView: (isProjectView: boolean) => void;
  setColors: (fromColor: string, toColor: string) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setTransitionProgress: (progress: number) => void;
  beginTransition: (
    toProjectView: boolean,
    newFromColor: string,
    newToColor: string
  ) => void;
}

export const useBackgroundStore = create<BackgroundState>((set, get) => ({
  // Initial states
  isProjectView: false,
  fromColor: '#0d1115',
  toColor: '#1a2632',
  isTransitioning: false,
  transitionProgress: 0,

  // Default colors
  cardViewFromColor: '#0d1115',
  cardViewToColor: '#1a2632',
  projectViewFromColor: '#0d1115',
  projectViewToColor: '#1a2632',

  // Get current colors based on view state
  getCurrentColors: () => {
    const state = get();
    return state.isTransitioning
      ? { fromColor: state.fromColor, toColor: state.toColor }
      : state.isProjectView
      ? { fromColor: state.projectViewFromColor, toColor: state.projectViewToColor }
      : { fromColor: state.cardViewFromColor, toColor: state.cardViewToColor };
  },

  // Setters
  setProjectView: (isProjectView) => set({ isProjectView }),

  setColors: (fromColor, toColor) => {
    // Validate colors
    if (!/^#[0-9A-F]{6}$/i.test(fromColor) || !/^#[0-9A-F]{6}$/i.test(toColor)) {
      console.warn('Invalid color format provided.');
      return;
    }

    set((state) => ({
      ...(state.isProjectView
        ? { projectViewFromColor: fromColor, projectViewToColor: toColor }
        : { cardViewFromColor: fromColor, cardViewToColor: toColor }),
      fromColor,
      toColor,
    }));
  },

  setTransitioning: (isTransitioning) => set({ isTransitioning }),

  setTransitionProgress: (progress) => {
    if (progress < 0 || progress > 1) {
      console.warn('Transition progress must be between 0 and 1.');
      return;
    }
    set({ transitionProgress: progress });
  },

  // Transition handler
  beginTransition: (toProjectView, newFromColor, newToColor) => {
    // Validate colors
    if (!/^#[0-9A-F]{6}$/i.test(newFromColor) || !/^#[0-9A-F]{6}$/i.test(newToColor)) {
      console.warn('Invalid color format provided for transition.');
      return;
    }

    set((state) => ({
      isTransitioning: true,
      transitionProgress: 0,
      isProjectView: toProjectView,
      fromColor: state.fromColor,
      toColor: state.toColor,
      ...(toProjectView
        ? { projectViewFromColor: newFromColor, projectViewToColor: newToColor }
        : { cardViewFromColor: newFromColor, cardViewToColor: newToColor }),
    }));
  },
}));
