import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


import { AuthService } from '../services/auth.service';



@Component({
    selector: 'login',
    imports: [RouterLink, CommonModule, ReactiveFormsModule,],
    templateUrl: './login.component.html',
})

export class LoginComponent {

    authService = inject(AuthService)
    fb = inject(FormBuilder);
    router = inject(Router);

    isPosting = signal(false);
    hasError = signal(false);
    errorMesage = signal('');

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    onSubmit() {
        if (this.loginForm.invalid) {
            this.hasError.set(true);
            this.errorMesage.set('Identidad rechazada por el sistema.')
            this.loginForm.markAllAsTouched();
            return;
        }

        this.isPosting.set(true);
        this.hasError.set(false);

        const { email, password } = this.loginForm.value;

        this.authService.login(email!, password!).subscribe({
            next: (isAuthenticated) => {
                if (isAuthenticated) {
                    this.router.navigateByUrl('/bank/wallet');
                } else {
                    this.isPosting.set(false);
                    this.hasError.set(true);
                    this.errorMesage.set('Credenciales invalidas')
                }
            },
            error: (err) => {
                this.isPosting.set(false);
                this.hasError.set(true);
                this.errorMesage.set('Error en la coneccion')
                console.error('login error', err)
            }
        });

    }

}
