import { Project } from "../types";
import {
  seatAppIcon,
  researchFindingsSA,
  carlosPersona,
  navigationFlow,
  seatSelection,
  bookingProcessSA,
  interfaceIterations,
  finalScreensSA,
} from "../../../assets/images/projects";

export const seatReservationApp: Project = {
  name: "Seat Reservation App Design",
  type: "UX Design",
  timeline: "August 2023 - October 2023",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation-app",
  cardOverview: "Mobile cinema booking experience with intuitive seat selection.",
  heroImage: seatAppIcon,
  theme: {
    gradient: {
      from: "#1A1425",
      to: "#312A3F",
    },
    textColor: "#ffffff",
  },
  content: [
    {
      type: "heading",
      content: "Seat Reservation App Design",
      layout: "contained",
    },
    {
      type: "image",
      content: seatAppIcon, // Main app interface highlighting movie selection and quick booking options
    },
    {
      type: "paragraph",
      content: "A mobile application designed to streamline the movie theater booking experience, focusing on intuitive seat selection and efficient ticket management. The app combines theater layout visualization with streamlined booking flows, prioritizing ease of use for families and groups while maintaining a clear view of seating options.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "User Pain Points",
      layout: "contained",
    },
    {
      type: "image",
      content: researchFindingsSA, // Visualization of key user challenges with current booking systems
    },
    {
      type: "paragraph",
      content: "Research revealed critical pain points in existing theater booking systems: complex seat visualization, time-consuming booking processes, limited group accommodation, and difficult booking modifications. These findings highlighted the need for an interface that simplifies seat selection while supporting family and group bookings.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Research Foundations",
      layout: "contained",
    },
    {
      type: "image",
      content: carlosPersona, // Persona card and journey map for Carlos
    },
    {
      type: "paragraph",
      content: "Our primary persona, Carlos, represents tech-savvy parents who frequently organize family movie outings. His journey highlighted specific needs around group seating arrangements and quick booking processes, directly informing our focus on streamlined seat selection and efficient ticket management.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Core Navigation",
      layout: "contained",
    },
    {
      type: "image",
      content: navigationFlow, // Key wireframes showing main app navigation and user flows
    },
    {
      type: "paragraph",
      content: "The navigation structure prioritizes quick access to essential booking functions through a tab-based interface. This design enables rapid switching between movies, showtimes, and seat selection while maintaining context awareness throughout the booking process.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Seat Selection Design",
      layout: "contained",
    },
    {
      type: "image",
      content: seatSelection, // Detailed screens showing seat visualization and selection interface
    },
    {
      type: "paragraph",
      content: "The seat selection interface implements a grid system with indicators for available, selected, and reserved seats. Enhanced visualization features provide immediate feedback on viewing angles and group seating options, supporting informed decision-making during the booking process.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Booking Flow",
      layout: "contained",
    },
    {
      type: "image",
      content: bookingProcessSA, // Series of screens showing the complete booking sequence
    },
    {
      type: "paragraph",
      content: "The booking process follows a linear progression with state management between steps. Each stage provides relevant context and quick actions, from seat selection through payment and confirmation, while maintaining the ability to modify selections throughout the flow.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Interface Refinement",
      layout: "contained",
    },
    {
      type: "image",
      content: interfaceIterations, // Before/after comparisons showing key improvements
    },
    {
      type: "paragraph",
      content: "Usability testing identified opportunities to enhance seat visualization and streamline the booking confirmation process. Iterations focused on improving feedback mechanisms, clarifying group selection tools, and optimizing the checkout flow for faster completion.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Final Implementation",
      layout: "contained",
    },
    {
      type: "image",
      content: finalScreensSA, // Polished screens highlighting core features
    },
    {
      type: "paragraph",
      content: "The final interface balances efficient booking flows with clear seat visualization, creating a focused mobile experience that simplifies movie theater reservations. Impact metrics show significant improvements in booking completion rates and user satisfaction, particularly for family group bookings.",
      layout: "contained",
    },
    {
      type: "spacer",
      content: "",
      layout: "contained",
    },
    {
      type: "paragraph",
      content: "View the complete experience: **[Interactive Prototype](https://www.figma.com/proto/cQ2gE04NhcsXgidMoftnV3/Movie-Theater-Seat-Reservation-App-Concept?page-id=1%3A3011&node-id=1-4236&p=f&viewport=618%2C647%2C0.14&t=X1jckClJx52NIvk8-1&scaling=min-zoom&content-scaling=fixed)**",
      layout: "contained",
      className: "text-start"
    }
  ],
};