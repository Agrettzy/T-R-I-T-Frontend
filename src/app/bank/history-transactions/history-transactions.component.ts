import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';


import { WalletService } from '../services/wallet.service';


@Component({
    selector: 'app-transactions',
    imports: [ RouterLink, DatePipe ],
    templateUrl: './history-transactions.component.html',
})
export class HistoryransactionsComponent {

    walletService = inject(WalletService);

}
