import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'register',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './register.component.html',
})

export class RegisterComponent {

    fb = inject(FormBuilder);
    router = inject(Router);

    isPosting = signal(false);
    hasError = signal(false);
    errorMesage = signal('');

    registerForm = this.fb.group({
        alias: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });



    onSubmit() {
        if (this.registerForm.invalid) {
            this.hasError.set(true);
            this.errorMesage.set('Error en la encriptación de identidad. No cumples con los requisitos');
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isPosting.set(true);
        this.hasError.set(false);

        setTimeout(() => {
            this.isPosting.set(false);
            this.router.navigate(['/auth/login']);
        }, 2000);

    }

    getError(field: string): string | null {
        const control = this.registerForm.get(field);
        if (!control || !control.errors || !control.touched)
            return null;

        if ( control.hasError('required') )
            return ('Este campo es vital para ser socio');

        if ( control.hasError('email') )
            return ('Canal encriptado comprometido o invalido');

        if ( control.hasError('minlength') )
            return ('Minimo 6 caracteres de seguridad, entre ellos al menos una mayuscula y un numero');

        return ('Error de validacion no identificado');

    }

}
