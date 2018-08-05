import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

    constructor(private router: Router) {

    }

    canActive() {
        const user: any = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
        if (user.token) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}