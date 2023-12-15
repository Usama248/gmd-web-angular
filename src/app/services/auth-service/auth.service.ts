import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandler } from '../../shared/services/api-handler.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../../shared/services/storage.service';
import { AUTH_API_ENDPOINTS } from 'src/app/shared/constants/api-endpoint-url';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiHandler {
  constructor(myHttpClient: HttpClient,
    private router: Router, private storageService: StorageService) {
    super(myHttpClient);
    console.log("auth service initilized")
  }

  public login(credentials: {
    email: string;
    password: string;
  }) {
    return this.post(environment.apiUrl + AUTH_API_ENDPOINTS.Login, credentials)
  }

  public get getUserData(): any {
    return jwtDecode(this.storageService.accessToken) ?? ''
  }
  public get loginUserId() {
    return this.getUserData?.user_id;
  }
  public getProfile() {
    return this.get(environment.apiUrl + AUTH_API_ENDPOINTS.GetProfile)
  }
  public isLogin(): boolean {
    const accessToken = this.storageService.accessToken;
    return accessToken?.length > 0;
  }
  public logout(): void {
    this.storageService.clean();
    this.router.navigate(['/login']);
  }
}

