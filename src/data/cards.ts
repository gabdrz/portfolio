// src/data/cards.ts
import { Card } from '../types/cards';
import { projectsData } from './projectsData';
import profileImage from '../assets/images/profile.jpg';

// Import project images
import rocketLeagueIcon from '../assets/images/projects/icon_rl.png';
import doctorAppIcon from '../assets/images/projects/icon_da.png';
import seatWebIcon from '../assets/images/projects/icon_mvw.png';
import seatAppIcon from '../assets/images/projects/icon_mva.png';
import portfolioIcon from '../assets/images/projects/icon_pw.png';
import carMaintenanceIcon from '../assets/images/projects/icon_cm.png';
import freedomBoardIcon from '../assets/images/projects/icon_afb.png';

// Function to get image for a project
const getProjectImage = (projectName: string): string => {
  const imageMap: { [key: string]: string } = {
    'RL Sideswipe UX Refresh': rocketLeagueIcon,
    'Doctors Appointment App Design': doctorAppIcon,
    'Seat Reservation Website Design': seatWebIcon,
    'Seat Reservation App Design': seatAppIcon,
    'Portfolio Website Redesign': portfolioIcon,
    'Car Maintenance App': carMaintenanceIcon,
    'Automated Freedom Board': freedomBoardIcon,
  };

  const image = imageMap[projectName];
  if (!image) {
    console.warn(`No image found for project: ${projectName}`);
  }
  return image || '';
};

export const cards: Card[] = [
  // Introduction Card
  {
    id: 1,
    type: 'content',
    image: profileImage,
    title: "Hi, I'm Gabriel!",
    subtitle: "I'm a **software developer** and **UX designer** with a B.S. in Computer Science and a Google UX Design Certificate."
  },

  // First Links Card (Vertical)
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

  // UX Design Header
  {
    id: 3,
    type: 'header',
    title: 'UX Design Projects'
  },

  // UX Design Project Cards
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

  // Software Development Header
  {
    id: 10,
    type: 'header',
    title: 'Software Development Projects'
  },

  // Software Development Project Cards
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

  // Final Links Card (Horizontal)
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