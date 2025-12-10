import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Transactions } from './transactions/transactions';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'transactions',
                component: Transactions
            }
        ]

    },
    
];
