import { Project } from "../types";
import { carMaintenanceIcon } from "../../../assets/images/projects";

export const carMaintenance: Project = {
    name: 'Car Maintenance App',
    type: 'Software Development',
    timeline: 'Feb 2024 - Apr 2024',
    status: 'Completed',
    githubUrl: 'https://github.com/example/car-maintenance',
    liveUrl: 'https://example.com/car-maintenance',
    cardOverview: "Smart tracking and maintenance alerts.",
    theme: {
      gradient: {
        from: '#1F2D3A',
        to: '#37404D'
      },
      textColor: '#ffffff'
    },
    content: [
      {
        type: 'heading',
        content: 'Car Maintenance App',
        layout: 'contained'
      },
      {
        type: 'image',
        content: carMaintenanceIcon,
      },
      {
        type: 'paragraph',
        content: 'Car maintenance shouldn\'t be a mystery. We built an app that makes tracking and maintaining your vehicle as simple as checking your social media.',
        layout: 'contained'
      },
      {
        type: 'quote',
        content: 'Your car should tell you what it needs.',
        backgroundColor: '#065F46'
      },
      {
        type: 'heading',
        content: 'Technical Architecture',
        layout: 'contained'
      },
      {
        type: 'image',
        content: '/path/to/architecture.jpg',
        layout: 'wide',
        className: 'rounded-xl shadow-lg'
      }
    ]
};
