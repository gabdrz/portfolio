// src/App.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Cards } from './components/Cards';
import ProjectView from './components/project/ProjectView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Flip } from 'gsap/Flip';

// Register all GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

// Get the base URL from environment
const getBaseUrl = () => {
  if (import.meta.env.DEV) return '/';
  return '/portfolio/'; // Your GitHub repo name
};

// Create router with routes
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Cards />,
      children: [
        {
          path: 'project/:id',
          element: <ProjectView />
        }
      ]
    },
    // Catch-all redirect to home
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ],
  {
    basename: getBaseUrl()
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;