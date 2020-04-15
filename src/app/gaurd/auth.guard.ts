import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private api: AppService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.api.getUser() === undefined || !this.api.isAuthenticated()) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
  }
}
