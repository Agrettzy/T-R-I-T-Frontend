import { Routes } from "@angular/router";


export const bankRoutes: Routes = [

    {
        path: '',
        children: [
            {
                path: 'wallet',
                loadComponent: () => import('./wallet/wallet.component')
                    .then(m => m.WalletComponent)
            },
            {
                path: 'transfer',
                loadComponent: () => import('./transfer/transfer.component')
                    .then(m => m.TransferComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./profile/profile.component')
                    .then(m => m.ProfileComponent)
            },
            {
                path: 'history',
                loadComponent: () => import('./history-transactions/history-transactions.component')
                    .then(m => m.HistoryransactionsComponent)
            },
            // {
            //     path: 'balance',
            //     loadComponent: () => import('./balance/balance.component')
            //         .then(m => m.BalanceComponent)
            // },
            {
                path: '',
                redirectTo: 'wallet',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'wallet',
            },
        ],
    },

];

export default bankRoutes;
