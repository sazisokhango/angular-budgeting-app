import { Routes } from '@angular/router';

export const TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/transaction-page/transaction-page.component').then((m) => m.TransactionsComponent),
  },
];
