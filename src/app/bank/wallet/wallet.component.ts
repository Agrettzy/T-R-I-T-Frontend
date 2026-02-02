import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WalletService } from '../services/wallet.service';
import { AuthService } from '../../auth/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'wallet',
    imports: [RouterLink, DatePipe],
    templateUrl: './wallet.component.html',
})


export class WalletComponent {

    walletServices = inject(WalletService);
    autServices = inject(AuthService);

    user = this.autServices.user;

    balanceResource = this.walletServices.balanceResource;
    historyResource = this.walletServices.historyResource;


}
