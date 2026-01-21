import { Routes } from '@angular/router';

import { HomeComponent } from './features/home';
import { DashboardComponent } from './features/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./features/transactions/transaction.routes').then((r) => r.TRANSACTION_ROUTES),
      },
    ],
  },
];
