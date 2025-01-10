import { Project } from "../types";
import {
  seatWebIcon,
  userPainPoints,
  researchFindings,
  sitemapStructure,
  wireframeScreens,
  bookingProcess,
  usabilityResults,
  finalScreensSW,
} from "../../../assets/images/projects";

export const seatReservationWeb: Project = {
  name: "Seat Reservation Website Design",
  type: "UX Design",
  timeline: "November 2023 to December 2023",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation",
  cardOverview: "Web-based seat booking interface for cinema venues",
  heroImage: seatWebIcon, // Project hero image showing the main interface with seat selection screen
  theme: {
    gradient: {
      from: "#0D1E2A",
      to: "#273F4D",
    },
    textColor: "#ffffff",
  },
  content: [
    {
      type: "heading",
      content: "Seat Reservation Website Design",
      layout: "contained",
    },
    {
      type: "image",
      content: seatWebIcon, // Main project hero image featuring the interface with cinema context
    },
    {
      type: "paragraph",
      content: "A responsive web application designed to simplify the cinema seat booking process. The project focused on creating an efficient interface that provides clear seat information and streamlines the selection process, while maintaining technical scalability for various cinema venues. The system combines intuitive navigation with detailed viewing perspectives to support informed booking decisions.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Understanding User Challenges",
      layout: "contained",
    },
    {
      type: "image",
      content: userPainPoints, // Visualization of four key pain points: Complex Navigation, Limited Seat Information, Inflexible Scheduling, and Overwhelming Options
    },
    {
      type: "paragraph",
      content: "Initial analysis identified significant usability gaps in existing booking platforms. Users faced excessive navigation steps and limited seat information, leading to booking abandonments and user frustration. These insights shaped our development approach toward an information-focused interface that reduces cognitive load during the booking process.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Research & Discovery",
      layout: "contained",
    },
    {
      type: "image",
      content: researchFindings, // Visualization of user research data and Jamie's persona profile
    },
    {
      type: "paragraph",
      content: "Research centered on understanding frequent moviegoers' booking patterns and preferences, represented through our primary persona, Jamie. User interviews revealed key opportunities for improving seat preview functionality and scheduling efficiency, directly informing our feature prioritization and interface decisions.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Design Foundation",
      layout: "contained",
    },
    {
      type: "image",
      content: sitemapStructure, // Information architecture diagram showing the streamlined navigation structure
    },
    {
      type: "paragraph",
      content: "The information architecture prioritizes core booking functions while providing efficient paths to account management and user preferences. This organization reduces navigation complexity through logical feature grouping and clear interaction pathways, establishing a foundation for intuitive user flows.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Core Interface Design",
      layout: "contained",
    },
    {
      type: "image",
      content: wireframeScreens, // Digital wireframes showing homepage layout with location/date controls and movie browsing
    },
    {
      type: "paragraph",
      content: "Interface development focused on optimizing access to essential booking functions through strategic placement of location and date controls. The modular design system maintains consistent interaction patterns while accommodating various content types and viewing scenarios.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Booking Experience",
      layout: "contained",
    },
    {
      type: "image",
      content: bookingProcess, // Visualization of the seat selection and booking flow with key interaction points
    },
    {
      type: "paragraph",
      content: "The booking flow integrates 3D seat preview functionality with intelligent scheduling options, enabling efficient decision-making. State management throughout the process allows users to modify their selections while maintaining session continuity, reducing friction in the booking experience.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Usability Insights",
      layout: "contained",
    },
    {
      type: "image",
      content: usabilityResults, // Before/after comparisons showing interface improvements based on user testing
    },
    {
      type: "paragraph",
      content: "User testing identified specific areas for enhancement in navigation patterns and content organization. These findings led to refined interaction flows, improved call-to-action placement, and optimized page layouts that better align with user expectations and task completion patterns.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Refined Experience",
      layout: "contained",
    },
    {
      type: "image",
      content: finalScreensSW, // High-fidelity mockups of key screens in the final implementation
    },
    {
      type: "paragraph",
      content: "The final implementation balances efficient navigation with comprehensive booking tools. Key features include enhanced seat previews and streamlined checkout flows, creating a focused interface that supports quick decision-making while providing necessary booking details.",
      layout: "contained",
    },
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "View the interactive prototypes: **[Mobile Version](https://www.figma.com/proto/cQ2gE04NhcsXgidMoftnV3/Movie-Theater-Seat-Reservation-App-Concept?page-id=2%3A30773&node-id=190-9668&p=f&viewport=618%2C647%2C0.15&t=t0LO5kcOigJoa098-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=190%3A9668&show-proto-sidebar=1)** | **[Desktop Version](https://www.figma.com/proto/cQ2gE04NhcsXgidMoftnV3/Movie-Theater-Seat-Reservation-App-Concept?page-id=2%3A30773&node-id=2-30774&p=f&viewport=618%2C647%2C0.15&t=t0LO5kcOigJoa098-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A30774&show-proto-sidebar=1)**",
      layout: "contained",
      className: "font-bold text-start"
    }
  ],
};