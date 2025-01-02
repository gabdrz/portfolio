// src/App.tsx
import { Cards } from './components/Cards';
import ProjectView from './components/project/ProjectView';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <Cards />,
    children: [{ path: 'project/:id', element: <ProjectView /> }]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;