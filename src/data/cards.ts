// src/data/cards.ts
import { Card } from '../types/cards';
import { projectsData } from './projects';
import profileImage from '../assets/images/profile.jpg';
import { getProjectImage } from '../utils/imageUtils';  // We'll create this

export const cards: Card[] = [
  {
    id: 1,
    type: 'content',
    image: profileImage,
    title: "Hi, I'm Gabriel!",
    subtitle: "I'm a **software developer** and **UX designer** with a B.S. in Computer Science and a Google UX Design Certificate."
  },
  {
    id: 2,
    type: 'links',
    layout: 'vertical',
    links: {
      email: 'your.email@example.com',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      resume: '/path/to/your/resume.pdf'
    }
  },
  {
    id: 3,
    type: 'header',
    title: 'UX Design Projects'
  },
  ...projectsData.uxDesign.map((project, index) => ({
    id: 4 + index,
    type: 'content' as const,
    image: getProjectImage(project.name),
    title: project.name,
    subtitle: project.cardOverview,
    projectData: {
      type: project.type,
      status: project.status,
      theme: project.theme,
      content: project.content
    }
  })),
  {
    id: 10,
    type: 'header',
    title: 'Software Development Projects'
  },
  ...projectsData.softwareDev.map((project, index) => ({
    id: 11 + index,
    type: 'content' as const,
    image: getProjectImage(project.name),
    title: project.name,
    subtitle: project.cardOverview,
    projectData: {
      type: project.type,
      status: project.status,
      theme: project.theme,
      content: project.content
    }
  })),
  {
    id: 15,
    type: 'links',
    layout: 'horizontal',
    links: {
      email: 'your.email@example.com',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      resume: '/path/to/your/resume.pdf'
    }
  }
];