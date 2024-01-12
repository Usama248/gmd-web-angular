import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthRepository } from '../services/auth-service/auth.repository';

export const isClinicGuard: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(inject(AuthRepository).UserTokenData.is_clinic_user) {
   return true;
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
};