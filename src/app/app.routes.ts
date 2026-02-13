import { Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './features/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
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
