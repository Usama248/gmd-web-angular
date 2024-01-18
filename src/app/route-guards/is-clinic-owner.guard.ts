import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthRepository } from '../services/auth-service/auth.repository';
import { inject } from '@angular/core';

export const isClinicOwnerGuard: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(inject(AuthRepository).UserTokenData.is_owner) {
   return true;
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
};