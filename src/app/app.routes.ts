import { Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [

    {
        path: 'welcome',
        component: WelcomeComponent,
    },

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.default)
    },
    {
        path: 'bank',
        // canActivate: [ authGuard ]
        loadChildren: () => import('./bank/bank.routes').then(m => m.default)
    },

    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: '/welcome',
    }
];
