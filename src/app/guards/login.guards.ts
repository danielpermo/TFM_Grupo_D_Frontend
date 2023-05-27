import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const loginGuard = () => {
    const token = localStorage.getItem('token_user');
    const router = inject(Router);

    if (!token) {
        alert('Para acceder, tienes que hacer login');
        router.navigate(['/login']);
        return false;
    }

    return true;
}