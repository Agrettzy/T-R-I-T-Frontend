import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const NotAuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const status = authService.authStatus();

    if (status === 'authenticated') {
        router.navigateByUrl('/bank/wallet');
        return false;
    }

    if (status === 'checking') {
        return false;
    }

    return true;
};
