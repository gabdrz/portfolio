// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Cards } from './components/Cards';
import ProjectView from './components/project/ProjectView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Flip } from 'gsap/Flip';

// Register all GSAP plugins in one place
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <main className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
