import { Component, inject, signal } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { Router, RouterLink } from '@angular/router';


@Component({
    selector: 'transfer',
    imports: [RouterLink],
    templateUrl: './transfer.component.html',
})


export class TransferComponent {

    walletService = inject(WalletService);
    router = inject(Router);

    toAccount = signal('');
    amount = signal<number>(0);
    transactionResult = signal<any>(null);


    isProcessing = signal(false);
    errorMessage = signal<string | null>(null);

    execute() {

        const target = this.toAccount().trim();
        const value = this.amount();

        if(target.length !== 10) {
            this.errorMessage.set('La cuenta debe tener 10 digitos');
            return;
        }

        if( target === this.walletService.accountKey()) {
            this.errorMessage.set('No puedes tranferirte a ti mismo tramposo.');
            return;
        }

        if(value <= 0) {
            this.errorMessage.set('No puedes tranferirte ₿ 0, deja de jugar');
            return;
        }

        if(value > this.walletService.balance()) {
            this.errorMessage.set('No tienes tanto dinero, apegate a algo mas real');
            return;
        }


        this.isProcessing.set(true);
        this.errorMessage.set(null);


        this.walletService.sendTransfer( this.toAccount(), this.amount() )
            .subscribe({
                next: (resp) => {
                    this.transactionResult.set(resp);
                    this.isProcessing.set(false);
                },
                error: (err) => {
                    this.isProcessing.set(false);
                    this.errorMessage.set(err.error?.message || 'Error en la red T.R.I.T');

                    setTimeout(() => {
                        this.errorMessage.set(null);
                    }, 5000);
                }

            });
    }
}
