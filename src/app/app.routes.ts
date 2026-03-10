import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full', 
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@/app/features/home/home.component').then((r) => r.HomeComponent),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('@/app/features/transactions/transaction.routes').then((r) => r.TRANSACTION_ROUTES),
      },
    ],
  },
];
