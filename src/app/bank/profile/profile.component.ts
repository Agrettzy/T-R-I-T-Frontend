import { CommonModule } from '@angular/common';
import { Component, inject, } from '@angular/core';
import { RouterLink } from '@angular/router';


import { AuthService } from '../../auth/services/auth.service';
import { WalletService } from '../services/wallet.service';



@Component({
    selector: 'profile',
    imports: [RouterLink, CommonModule],
    templateUrl: './profile.component.html',
})


export class ProfileComponent {

    authService = inject(AuthService);
    walletServices = inject(WalletService);

}
