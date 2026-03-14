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
        path: 'register',
        loadComponent: () =>
          import('@/app/features/register/register.component').then((r) => r.RegisterComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@/app/features/login/login.component').then((r) => r.LoginComponent),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('@/app/features/account/account.component').then((r) => r.AccountAccount),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('@/app/features/home/home.component').then((r) => r.HomeComponent),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('@/app/features/transactions/transaction.routes').then(
            (r) => r.TRANSACTION_ROUTES
          ),
      },
    ],
  },
];
