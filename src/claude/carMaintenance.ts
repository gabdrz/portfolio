import { Project } from "../types";
import {
  carMaintenanceIcon,
  carMaintenanceLogin,
  carMaintenanceDashboard,
  carMaintenanceHistory,
  carMaintenanceCreate,
  carMaintenanceEdit,
} from "../../../assets/images/projects";

export const carMaintenance: Project = {
  name: "Car Maintenance App",
  type: "Software Development",
  timeline: "Feb 2024 - Apr 2024",
  status: "Paused",
  githubUrl: "https://github.com/example/car-maintenance",
  cardOverview: "App for tracking vehicle maintenance and alerts.",
  theme: {
    gradient: {
      from: "#1F2D3A",
      to: "#37404D",
    },
    textColor: "#ffffff",
  },
  content: [
    {
      type: "heading",
      content: "Car Maintenance App",
      layout: "contained",
    },
    {
      type: "image",
      content: carMaintenanceIcon,
    },
    {
      type: "paragraph",
      content:
        "Back in June, a close friend of mine reached out with an idea for an app to help users manage their vehicles more effectively. He’s a developer who often works on side projects with his team, and he invited me to join in as the UX designer and front-end developer for this project. Over the course of a month, I focused on designing a clean, user-friendly interface and building functional components to bring this idea to life. This collaboration allowed me to combine creativity and technical skills to develop an app tailored to meet user needs effectively.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Authentication Screen",
      layout: "contained",
    },
    {
      type: "image",
      content: carMaintenanceLogin,
    },
    {
      type: "paragraph",
      content:
        "The login interface features a dark theme design with email-based authentication, implementing form validation and error handling through React Native's Context API. The AuthContext provider manages user sessions and authentication state, while providing direct pathways for password recovery and account creation through clearly labeled interface elements.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Home Screen Evolution",
      layout: "contained",
    },
    {
      type: "image",
      content: carMaintenanceDashboard,
    },
    {
      type: "paragraph",
      content:
        "The home screen displays vehicle information through a card-based layout with maintenance status indicators and vehicle photos. Each card component integrates with VehicleContext to present key data including mileage, year, and model information. The interface includes dedicated Add Car and Edit Car functions, with a bottom navigation bar providing access to Messages, Search, Profile, and Settings.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Record Management",
      layout: "contained",
    },
    {
      type: "image",
      content: carMaintenanceHistory,
    },
    {
      type: "paragraph",
      content:
        "The maintenance records interface implements both icon-based and photo-integrated layouts for service history visualization. Built using TestItem components, each record entry displays comprehensive service information including costs, mileage, and dates. The interface provides maintenance type indicators and integrates with the analytics system through a top-bar toggle, maintaining consistent styling through GlobalStyles.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Add Record Screen",
      layout: "contained",
    },
    {
      type: "image",
      content: carMaintenanceCreate,
    },
    {
      type: "paragraph",
      content:
        "The record entry system uses a form-based interface with fields for maintenance type, description, amount, mileage, and date input. The AddRecordScreen component incorporates photo functionality through Take Photo and Add Photo actions, with a photo counter and form validation. The implementation maintains data consistency through RecordContext while providing clear visual feedback for user inputs.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Record Editing Interface",
      layout: "contained",
    },
    {
      type: "image",
      content: carMaintenanceEdit,
    },
    {
      type: "paragraph",
      content:
        "The record editing interface extends the creation system by displaying existing record data and uploaded photos, allowing modifications to all maintenance record fields. The EditRecordScreen component manages state for both photo assets and form data, implementing delete functionality for existing photos while maintaining data integrity through proper state management and validation.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Final Thoughts",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "While the team has made significant progress in building the foundation of the app, development has currently been paused due to scheduling conflicts. Despite the pause, I remain optimistic about the potential of this project and would love to continue working on it in the future. It's been a rewarding experience collaborating with my friend and applying my skills to create an app that has the potential to help so many users. I look forward to seeing this idea flourish into what it was meant to be.",
      layout: "contained",
    },
  ],
};
