import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

export const authGuard: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(inject(AuthService).isLogin()) {
   return true;
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
};