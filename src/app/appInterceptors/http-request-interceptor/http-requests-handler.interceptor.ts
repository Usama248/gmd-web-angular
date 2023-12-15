import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../../services/auth-service/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { catchError, finalize, throwError } from 'rxjs';
import { BusyService } from '../../shared/services/busy.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ToastService } from '../../shared/services/toast.service';

@Injectable()
export class HttpRequestsHandlerInterceptor implements HttpInterceptor {

  constructor(private _storageService: StorageService, private busyService: BusyService, private loader: LoaderService, 
    private authService: AuthService, private toastrService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const accessToken = this._storageService.accessToken;
    if (accessToken !== null && typeof accessToken !== 'undefined') {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`,
          'TimeZoneId':Intl.DateTimeFormat().resolvedOptions().timeZone,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers':
            'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Accept-Encoding, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
          'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
        }
      });
    }
    // send cloned request with header to the next handler.
    this.loader.show();
    this.busyService.changeBusy(true);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        if (error.status === 401) {
          this.authService.logout();
        }
        else if (error.status === 0) {
          this.toastrService.showError('Server not responding, please check again later!');
        } 
        else if (error.status === 429) {
          this.toastrService.showError('Too many requests, please check again later!');
          this.authService.logout();
        } 
        else {
          this.toastrService.showError('Something unexpected happened!');
        }
        console.log(errorMsg);
        return throwError(() => new Error(errorMsg));
      }),
      finalize(() => {
        this.busyService.changeBusy(false);
        this.loader.hide();
      })
    );
  }
}
