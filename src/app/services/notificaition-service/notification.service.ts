import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { AuthService } from '../auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { NOTIFICATIONS_ENDPOINTS } from 'src/app/shared/constants/api-endpoint-url';

@Injectable({
  providedIn: 'root'
})
export class NotificationService  extends ApiHandler {
  constructor(myHttpClient: HttpClient,
    private authService: AuthService) {
    super(myHttpClient);
  }

  public getNotificationsCount() {
    return this.get(environment.apiUrl + NOTIFICATIONS_ENDPOINTS.GetCountOfNotification+"?id="+this.authService.loginUserId)
  }
  public getLatestNotifications() {
    return this.get(environment.apiUrl + NOTIFICATIONS_ENDPOINTS.GetCountOfNotification+"?id="+this.authService.loginUserId)
  }
}
