import { create } from 'zustand';

interface BackgroundState {
  // View state
  isProjectView: boolean;
  fromColor: string;
  toColor: string;

  // Progress state
  progress: number;
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
  updateBackgroundGradient: (progress: number) => void;
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
  progress: 0,
  isTransitioning: false,
  transitionProgress: 0,

  // Default colors
  cardViewFromColor: '#0d1115',
  cardViewToColor: '#1a2632',
  projectViewFromColor: '#0d1115',
  projectViewToColor: '#1a2632',

  // Get current colors based on view state and progress
  getCurrentColors: () => {
    const state = get();
    
    // During transitions, use transition colors
    if (state.isTransitioning) {
      return { fromColor: state.fromColor, toColor: state.toColor };
    }
    
    // In project view, use project colors
    if (state.isProjectView) {
      return { 
        fromColor: state.projectViewFromColor, 
        toColor: state.projectViewToColor 
      };
    }
    
    // In card view, use card colors
    return { 
      fromColor: state.cardViewFromColor, 
      toColor: state.cardViewToColor 
    };
  },

  // Set the current view mode
  setProjectView: (isProjectView) => set({ isProjectView }),

  // Set colors for the current view
  setColors: (fromColor, toColor) => {
    // Validate color format
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

  // Set transition state
  setTransitioning: (isTransitioning) => set({ isTransitioning }),

  // Update transition progress
  setTransitionProgress: (progress) => {
    if (progress < 0 || progress > 1) {
      console.warn('Transition progress must be between 0 and 1.');
      return;
    }
    set({ transitionProgress: progress });
  },

  // Update background gradient based on scroll or card position
  updateBackgroundGradient: (progress) => {
    if (progress < 0 || progress > 1) {
      console.warn('Background progress must be between 0 and 1.');
      return;
    }
    
    set((state) => {
      // Only update if not transitioning
      if (state.isTransitioning) return state;

      return {
        progress,
        fromColor: state.isProjectView 
          ? state.projectViewFromColor 
          : state.cardViewFromColor,
        toColor: state.isProjectView 
          ? state.projectViewToColor 
          : state.cardViewToColor
      };
    });
  },

  // Handle view transitions
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
        ? { 
            projectViewFromColor: newFromColor, 
            projectViewToColor: newToColor 
          }
        : { 
            cardViewFromColor: newFromColor, 
            cardViewToColor: newToColor 
          }),
    }));
  },
}));