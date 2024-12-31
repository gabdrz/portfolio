import { Project } from "../types";
import { seatAppIcon } from "../../../assets/images/projects";

export const seatReservationApp: Project = {
  name: "Seat Reservation App Design",
  type: "UX Design",
  timeline: "Apr 2024 - May 2024",
  status: "Completed",
  liveUrl: "https://example.com/seat-reservation-app",
  cardOverview: "Mobile seat booking experience.",
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
      content: seatAppIcon,
    },
    {
      type: "paragraph",
      content:
        "Event venues and theaters often struggle with mobile seat selection interfaces that fail to provide an intuitive booking experience. Users frequently abandon bookings due to complicated selection processes and unclear seat availability visualization on mobile devices.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Research Insights",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Through user interviews and competitive analysis, we discovered that 67% of users prefer booking tickets on mobile devices, yet 42% report difficulties with seat selection. Key pain points included pinch-to-zoom issues, accidental selections, and lack of clear section overviews.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Design Strategy",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Our approach focused on progressive disclosure, breaking down the seat selection process into manageable steps. We implemented a section-first approach, allowing users to first select their preferred area before diving into specific seat choices.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Key Features",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "The app introduces innovative features such as haptic feedback for seat selection, adaptive zoom levels based on venue sections, and a smart seat suggestion system that recommends optimal seats based on user preferences and group size.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Technical Implementation",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Built using React Native and WebGL for smooth rendering of complex seat maps, the application maintains 60fps performance even when displaying large venues with thousands of seats. Real-time seat status updates are handled through WebSocket connections.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Accessibility Considerations",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "The app features VoiceOver and TalkBack support, with semantic markup for screen readers. High contrast modes and customizable text sizing ensure the app is usable for people with various visual impairments.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Testing & Iteration",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Usability testing with 50 participants across different age groups led to several iterations. We improved the contrast of seat availability indicators and simplified the section navigation based on user feedback.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Results & Impact",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "After launch, mobile booking completion rates improved by 48%, and average booking time decreased from 4.5 minutes to 2.3 minutes. User satisfaction scores increased from 6.8 to 8.9 out of 10.",
      layout: "contained",
    },
    {
      type: "heading",
      content: "Future Developments",
      layout: "contained",
    },
    {
      type: "paragraph",
      content:
        "Upcoming features include AR venue preview, social group booking coordination, and integration with virtual queue systems for high-demand events.",
      layout: "contained",
    },
  ],
};
