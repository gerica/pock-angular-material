import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { paths } from '../app-paths';

export const DashboardRoutes: Route[] = [
  {
    path: paths.dashboard,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
    ]
  },
];
