// src/data/projectsData.ts

interface Block {
  type: 'heading' | 'paragraph' | 'image' | 'gallery' | 'quote' | 'spacer';
  content: string;
  layout?: 'full' | 'wide' | 'contained';
  backgroundColor?: string;
  className?: string;
}

interface Project {
  name: string;
  type: string;
  timeline: string;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
  cardOverview: string;
  theme: {
    gradient?: {
      from: string;
      to: string;
    };
    backgroundColor?: string;
    textColor?: string;
  };
  content: Block[];
}

interface ProjectsData {
  uxDesign: Project[];
  softwareDev: Project[];
}

export const projectsData: ProjectsData = {
  uxDesign: [
    {
      name: 'RL Sideswipe UX Refresh',
      type: 'UX Design',
      timeline: 'Jan 2024 - Mar 2024',
      status: 'Completed',
      liveUrl: 'https://example.com/rocket-league',
      cardOverview: "Enhanced interface and feature expansion.",
      theme: {
        gradient: {
          from: '#0A1B37',
          to: '#1E3A47'
        },
        textColor: '#ffffff'
      },
      content: [
        {
          type: 'heading',
          content: 'Reimagining Rocket League Sideswipe\'s User Experience',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "With its dynamic gameplay and thrilling mechanics, Rocket League Sideswipe had the potential to dominate mobile gaming. However, a lack of streamlined navigation, cohesive features, and engaging interfaces hindered its growth. My UX refresh aimed to tackle these challenges, balancing functionality and aesthetics to enhance player engagement.",
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Background and Objectives',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "Drawing from my experience as a player and UX designer, I identified key challenges hindering the game/'s usability. These included navigation inefficiencies, limited social interactions, and a lack of interactivity in key features like the garage and loadout. My objectives were to streamline user flows, enhance functionality, and improve the overall information architecture.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'challenges-summary.png', // Replace with your final annotated screenshot of challenges
          layout: 'full-width'
        },
        {
          type: 'heading',
          content: 'The Initial State: Challenges Identified',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "The original user flow had redundancies and inefficiencies. Features like inventory access required multiple taps, social features were buried, and the overall layout lacked cohesion. These issues made the experience less intuitive for players.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'initial-user-flow.png', // Replace with your flowchart of the initial user flow
          layout: 'full-width'
        },
        {
          type: 'heading',
          content: 'Streamlining User Flows',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "Revised user flows eliminated unnecessary steps and grouped related features. For example, Rocket Pass and Challenges were combined to create a cohesive experience, and social overlays were made persistent for easier access.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'revised-user-flow.png', // Replace with your flowchart of the revised user flow
          layout: 'full-width'
        },
        {
          type: 'heading',
          content: 'A Cohesive and Intuitive Main Menu',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "The main menu was redesigned for simplicity and efficiency. Persistent friend overlays were added, redundant buttons were removed, and a darker theme with better button placement improved accessibility.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'main-menu-before.png', // Replace with a screenshot of the original main menu
          layout: 'half-width'
        },
        {
          type: 'image',
          content: 'main-menu-after.png', // Replace with a screenshot of the redesigned main menu
          layout: 'half-width'
        },
        {
          type: 'heading',
          content: 'Fostering Community Engagement',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "Social features were overhauled to encourage player interaction. Friend invites were streamlined, and online friends became persistently visible, making it easier to connect and play.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'friends-list-before.png', // Replace with a screenshot of the original friends list
          layout: 'half-width'
        },
        {
          type: 'image',
          content: 'friends-list-after.png', // Replace with a screenshot of the revised friends list
          layout: 'half-width'
        },
        {
          type: 'heading',
          content: 'Empowering Players Through Training and Customization',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "Training modules were redesigned to focus on specific skills, while the garage and loadout screens became more interactive and visually engaging.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'training-tutorial.png', // Replace with a screenshot of the redesigned training selection screen
          layout: 'half-width'
        },
        {
          type: 'image',
          content: 'garage-revamp.png', // Replace with a screenshot of the revamped garage
          layout: 'half-width'
        },
        {
          type: 'heading',
          content: 'Results and Impact',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "The refresh resulted in a more intuitive and engaging user experience. Players could navigate features with fewer taps, social interactions were seamless, and the aesthetic enhancements added to the game's overall appeal.",
          layout: 'contained'
        },
        {
          type: 'image',
          content: 'results-feedback.png', // Replace with mock user feedback visualization or results summary
          layout: 'full-width'
        },
        {
          type: 'heading',
          content: 'Reflection and Takeaways',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: "This project taught me the importance of balancing functionality with visual appeal and considering diverse player needs. It reinforced my belief that great UX can transform even the most dynamic experiences.",
          layout: 'contained'
        },
        {
          type: 'spacer',
          content: '',
          layout: 'contained'
        }
      ]
    },
    
    {
      name: 'Doctors Appointment App Design',
      type: 'UX Design',
      timeline: 'Mar 2024 - Apr 2024',
      status: 'Completed',
      liveUrl: 'https://example.com/doctor-app',
      cardOverview: "Streamlined medical appointment scheduling interface.",
      theme: {
        gradient: {
          from: '#10393E',
          to: '#1F474A'
        },
        textColor: '#ffffff'
      },
      content: [
        {
          type: 'heading',
          content: 'Revolutionizing Medical Scheduling',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'The healthcare industry has long struggled with efficient appointment scheduling. We set out to create a mobile application that would make booking and managing medical appointments as simple as ordering food delivery.',
          layout: 'contained'
        },
        {
          type: 'image',
          content: '/path/to/app-screens.jpg',
          layout: 'wide',
          className: 'rounded-xl shadow-lg'
        },
        {
          type: 'heading',
          content: 'User Research Insights',
          layout: 'contained'
        },
      ]
    },
    {
      name: 'Seat Reservation Website Design',
      type: 'UX Design',
      timeline: 'Apr 2024 - May 2024',
      status: 'Completed',
      liveUrl: 'https://example.com/seat-reservation',
      cardOverview: "Interactive web-based seat booking system.",
      theme: {
        gradient: {
          from: '#0D1E2A',
          to: '#273F4D'
        },
        textColor: '#ffffff'
      },
      content: [
        {
          type: 'heading',
          content: 'Simplifying Seat Selection',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Seat selection is often the most frustrating part of booking an event or travel. We created a real-time, interactive seat selection interface that makes choosing the perfect spot a breeze.',
          layout: 'contained'
        },
        {
          type: 'image',
          content: '/path/to/seat-map.jpg',
          layout: 'full',
          className: 'rounded-xl shadow-lg'
        },
        {
          type: 'quote',
          content: 'The best seat in the house should be easy to find.',
          backgroundColor: '#2C5282'
        }
      ]
    },
    {
      name: 'Seat Reservation App Design',
      type: 'UX Design',
      timeline: 'Apr 2024 - May 2024',
      status: 'Completed',
      liveUrl: 'https://example.com/seat-reservation-app',
      cardOverview: "Mobile seat booking experience.",
      theme: {
        gradient: {
          from: '#1A1425',
          to: '#312A3F'
        },
        textColor: '#ffffff'
      },
      content: [
        {
          type: 'heading',
          content: 'Problem Space',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Event venues and theaters often struggle with mobile seat selection interfaces that fail to provide an intuitive booking experience. Users frequently abandon bookings due to complicated selection processes and unclear seat availability visualization on mobile devices.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Research Insights',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Through user interviews and competitive analysis, we discovered that 67% of users prefer booking tickets on mobile devices, yet 42% report difficulties with seat selection. Key pain points included pinch-to-zoom issues, accidental selections, and lack of clear section overviews.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Design Strategy',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Our approach focused on progressive disclosure, breaking down the seat selection process into manageable steps. We implemented a section-first approach, allowing users to first select their preferred area before diving into specific seat choices.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Key Features',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'The app introduces innovative features such as haptic feedback for seat selection, adaptive zoom levels based on venue sections, and a smart seat suggestion system that recommends optimal seats based on user preferences and group size.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Technical Implementation',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Built using React Native and WebGL for smooth rendering of complex seat maps, the application maintains 60fps performance even when displaying large venues with thousands of seats. Real-time seat status updates are handled through WebSocket connections.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Accessibility Considerations',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'The app features VoiceOver and TalkBack support, with semantic markup for screen readers. High contrast modes and customizable text sizing ensure the app is usable for people with various visual impairments.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Testing & Iteration',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Usability testing with 50 participants across different age groups led to several iterations. We improved the contrast of seat availability indicators and simplified the section navigation based on user feedback.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Results & Impact',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'After launch, mobile booking completion rates improved by 48%, and average booking time decreased from 4.5 minutes to 2.3 minutes. User satisfaction scores increased from 6.8 to 8.9 out of 10.',
          layout: 'contained'
        },
        {
          type: 'heading',
          content: 'Future Developments',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'Upcoming features include AR venue preview, social group booking coordination, and integration with virtual queue systems for high-demand events.',
          layout: 'contained'
        }
      ]
    }
  ],
  softwareDev: [
    {
      name: 'Portfolio Website Redesign',
      type: 'Software Development',
      timeline: 'Jan 2024 - Feb 2024',
      status: 'Completed',
      githubUrl: 'https://github.com/example/portfolio',
      liveUrl: 'https://example.com/portfolio',
      cardOverview: "First professional web presence.",
      theme: {
        gradient: {
          from: '#111827',
          to: '#2D3748'
        },
        textColor: '#ffffff'
      },
      content: [
        {
          type: 'heading',
          content: 'Building a Digital Identity',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'When approaching my portfolio redesign, I wanted to create something that wasn\'t just a showcase of my work, but an experience that demonstrates my approach to design and development.',
          layout: 'contained'
        },
        {
          type: 'image',
          content: '/path/to/performance-metrics.jpg',
          layout: 'wide',
          className: 'rounded-xl shadow-lg'
        },
        {
          type: 'quote',
          content: 'Performance and aesthetics should never be a compromise.',
          backgroundColor: '#1F2937'
        },
        {
          type: 'paragraph',
          content: 'Using React and GSAP, I built a custom scrolling system that provides smooth animations while maintaining responsive performance across all devices.',
          layout: 'contained'
        }
      ]
    },
    {
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
          content: 'Keeping Cars Running Smoothly',
          layout: 'contained'
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
    },
    {
      name: 'Automated Freedom Board',
      type: 'Software Development',
      timeline: 'Apr 2024 - Ongoing',
      status: 'In Progress',
      githubUrl: 'https://github.com/example/freedom-board',
      cardOverview: "Automated message board to Instagram pipeline.",
      theme: {
        gradient: {
          from: '#102A43',
          to: '#223E4A'
        },
        textColor: '#ffffff'
      },
      content: [
        {
          type: 'heading',
          content: 'Automating Social Media',
          layout: 'contained'
        },
        {
          type: 'paragraph',
          content: 'The Freedom Board project automates the process of curating and publishing content from message boards to Instagram, while maintaining brand consistency and engagement.',
          layout: 'contained'
        },
        {
          type: 'image',
          content: '/path/to/automation-flow.jpg',
          layout: 'wide',
          className: 'rounded-xl shadow-lg'
        },
        {
          type: 'quote',
          content: 'Automation should feel personal.',
          backgroundColor: '#5B21B6'
        },
      ]
    }
  ]
};