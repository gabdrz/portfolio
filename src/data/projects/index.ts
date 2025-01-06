// src/data/projects/index.ts
import { Project } from './types';

// UX Design Projects
import { rocketLeagueSideswipe } from './uxDesign/rocketLeagueSideswipe';
import { doctorsAppointment } from './uxDesign/doctorsAppointment';

// Software Dev Projects
import { portfolioWebsite } from './softwareDev/portfolioWebsite';

import { workInProgress } from './workInProgress';

export interface ProjectsData {
 uxDesign: Project[];
 softwareDev: Project[];
}

export const projectsData: ProjectsData = {
 uxDesign: [
   rocketLeagueSideswipe,
   doctorsAppointment,
   workInProgress
 ],
 softwareDev: [
   portfolioWebsite,
   workInProgress
 ]
};