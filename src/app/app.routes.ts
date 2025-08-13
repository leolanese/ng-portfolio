import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./child-pure-signal/parent-pure-signal.component').then(m => m.ParentPureSignalComponent)
  },
  {
    path: 'experience',
    loadComponent: () => import('./experience-pure-signal/experience-parent.component').then(m => m.ExperienceParentComponent)
  },
  {
    path: 'workshops',
    loadComponent: () => import('./workshop-pure-signal/workshop-parent.component').then(m => m.WorkshopParentComponent)
  },
  {
    path: '',
    loadComponent: () => import('./child-pure-signal/parent-pure-signal.component').then(m => m.ParentPureSignalComponent)
  }
];
