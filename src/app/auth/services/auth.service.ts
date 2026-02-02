import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { LoginUser } from '../interfaces/login-user.interface';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { environment } from '../../environments/environment';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private _authStatus = signal<AuthStatus>('checking');
    private _user = signal<LoginUser | null>(null);
    private _token = signal<string | null>(localStorage.getItem('token'));

    private router = inject(Router)
    private http = inject(HttpClient);

    authStatus = computed<AuthStatus>(() => this._authStatus());

    user = computed(() => this._user());
    token = computed(this._token);
    isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

    login(email: string, password: string): Observable<boolean> {
        return this.http
            .post<AuthResponse>(`${baseUrl}/auth/login`, {
                email: email,
                password: password,
            })
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    register(userData: { email: string, password: string, fullName: string }): Observable<boolean> {
        return this.http
            .post<AuthResponse>(`${baseUrl}/auth/register`, userData)
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    checkStatus(): Observable<boolean> {
        const token = localStorage.getItem('token');

        if (!token) {
            this.logout();
            return of(false);
        }

        return this.http
            .get<AuthResponse>(`${baseUrl}/me/profile`)
            .pipe(
                map((resp) => this.handleAuthSuccess(resp)),
                catchError((error: any) => this.handleAuthError(error))
            );
    }

    clearAuthData() {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');

        localStorage.removeItem('token');
    }

    logout() {
        this.clearAuthData();
        this.router.navigateByUrl('/welcome');
    }

    private handleAuthSuccess({ token, user }: AuthResponse) {

        this._user.set(user);
        this._token.set(token);

        localStorage.setItem('token', token);
        this._authStatus.set('authenticated');
        return true;
    }

    private handleAuthError(error: any) {
        this.clearAuthData();
        return of(false);
    }
}
