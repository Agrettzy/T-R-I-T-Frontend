import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of, tap } from 'rxjs';


import { environment } from '../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { HistoryTransaction } from '../interfaces/historu-transfer.interfaces';


const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })

export class WalletService {

    private http = inject(HttpClient);
    private authService = inject(AuthService)



    profileResource = rxResource({
        stream: () => {
            if (this.authService.authStatus() !== 'authenticated')
                return of(null);

            return this.http.get<any>(`${baseUrl}/me/profile`);
        }
    });


    balanceResource = rxResource({
        stream: () => {
            if (this.authService.authStatus() !== 'authenticated')
                return of(null);

            return this.http.get<any>(`${baseUrl}/me/balance`)
        }
    });


    historyResource = rxResource({
        stream: () => {

            if (this.authService.authStatus() !== 'authenticated')
                return of([]);

            return this.http.get<HistoryTransaction[]>(`${baseUrl}/me/history`)
        }
    });


    sendTransfer(toAccount: string, amount: number): Observable<any> {
        return this.http.post(`${baseUrl}/transfers/execute`, {
            toAccount: toAccount.trim(),
            amount: Number(amount)
        })
        .pipe(
            tap(() => {
                this.balanceResource.reload();
                this.historyResource.reload();
            })
        );
    }


    userName = computed(() => this.profileResource.value()?.fullName ?? 0);
    userEmail = computed(() => this.profileResource.value()?.email ?? 'correo@no-detectado.com');


    balance = computed(() => this.balanceResource.value()?.balance ?? 0);
    accountKey = computed(() => this.balanceResource.value()?.accountKey ?? '--- ---- ---');
    history = computed(() => this.historyResource.value() ?? []);

}
