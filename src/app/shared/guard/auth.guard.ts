import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    console.log('--------auth log-------------------');
    }
    canActivate() {
        console.log('--------canActivate-------------------' + localStorage.getItem('isLoggedin'));
        if (localStorage.getItem('jwtToken')) {
            return true;
        }

        this.router.navigate(['/user/signin']);
        return false;
    }
}
