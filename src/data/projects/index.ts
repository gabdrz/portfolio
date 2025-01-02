// src/data/projects/index.ts
import { Project } from './types';

// UX Design Projects
import { rocketLeagueSideswipe } from './uxDesign/rocketLeagueSideswipe';

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
   workInProgress
 ],
 softwareDev: [
   portfolioWebsite,
   workInProgress
 ]
};