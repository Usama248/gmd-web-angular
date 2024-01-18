import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { inject } from '@angular/core';
import { environment } from 'src/environments/environment';

export const userStateGuard: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if(inject(StorageService).userAuthStateToken === environment.userStateToken) {
   return true;
  } else {
    return inject(Router).createUrlTree(['/login']);
  }
};