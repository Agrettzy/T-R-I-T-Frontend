import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';


export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) {
    const authService = inject(AuthService)
    const token = inject(AuthService).token();
    const isApiUrl = req.url.startsWith(environment.baseUrl)


    if (!token || !isApiUrl) {
        return next(req);
    }

    const newReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(newReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if(error.status === 401) {
                console.warn('Sesion expirada');
                authService.logout();
            }

            return throwError(() => error);
        })

    )

}
