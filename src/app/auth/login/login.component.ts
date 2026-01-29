import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'login',
    imports: [RouterLink, CommonModule, ReactiveFormsModule,],
    templateUrl: './login.component.html',
})
export class LoginComponent {

    fb = inject( FormBuilder );
    router = inject( Router );

    isPosting = signal( false );
    hasError = signal( false );
    errorMesage = signal('');

    loginForm = this.fb.group({
        email: ['', [ Validators.required, Validators.email ]],
        password: ['', [ Validators.required, Validators.minLength(6) ]],
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


        setTimeout(() => {
            this.isPosting.set(false);
            this.router.navigate(['/bank/wallet']);
        }, 2000);
    }


}
