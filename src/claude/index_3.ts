// src/data/projects/index.ts
import { Project } from './types';

// UX Design Projects
import { rocketLeagueSideswipe } from './uxDesign/rocketLeagueSideswipe';
import { doctorsAppointment } from './uxDesign/doctorsAppointment'; 
import { seatReservationWeb } from './uxDesign/seatReservationWeb';
import { seatReservationApp } from './uxDesign/seatReservationApp';

// Software Dev Projects
import { portfolioWebsite } from './softwareDev/portfolioWebsite';
import { carMaintenance } from './softwareDev/carMaintenance';
import { freedomBoard } from './softwareDev/freedomBoard';

export interface ProjectsData {
 uxDesign: Project[];
 softwareDev: Project[];
}

export const projectsData: ProjectsData = {
 uxDesign: [
   rocketLeagueSideswipe,
   doctorsAppointment,
   seatReservationWeb,
   seatReservationApp
 ],
 softwareDev: [
   portfolioWebsite,
   carMaintenance, 
   freedomBoard
 ]
};