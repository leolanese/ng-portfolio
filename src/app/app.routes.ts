import { Routes } from '@angular/router';
import { ParentPureSignalComponent } from './child-pure-signal/parent-pure-signal.component';
import { ExperienceParentComponent } from './experience-pure-signal/experience-parent.component';
import { WorkshopParentComponent } from './workshop-pure-signal/workshop-parent.component';

export const routes: Routes = [
  {
    path: 'home',
    component: ParentPureSignalComponent
  },
  {
    path: 'experience',
    component: ExperienceParentComponent
  },
  {
    path: 'workshops',
    component: WorkshopParentComponent
  },
  {
    path: '',
    redirectTo: '/experience',
    pathMatch: 'full'
  }
];
