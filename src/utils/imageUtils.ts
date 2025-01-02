import { rocketLeagueIcon, doctorAppIcon, seatWebIcon, seatAppIcon, portfolioIcon, carMaintenanceIcon, freedomBoardIcon, workInProgressIcon } from '../assets/images/projects';

export const getProjectImage = (projectName: string): string => {
  const imageMap: { [key: string]: string } = {
    'RL Sideswipe UX Refresh': rocketLeagueIcon,
    'Doctors Appointment App Design': doctorAppIcon,
    'Seat Reservation Website Design': seatWebIcon,
    'Seat Reservation App Design': seatAppIcon,
    'Portfolio Website Redesign': portfolioIcon,
    'Car Maintenance App': carMaintenanceIcon,
    'Automated Freedom Board': freedomBoardIcon,
    'More Projects Soon': workInProgressIcon,
  };

  const image = imageMap[projectName];
  if (!image) {
    console.warn(`No image found for project: ${projectName}`);
  }
  return image || '';
};