import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CLINICIAN_REQUEST_STATUS_API_ENDPOINTS } from 'src/app/shared/constants/api-endpoint-url';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicianRequestStatusService extends ApiHandler {

  constructor(myHttpClient: HttpClient, private authService: AuthService) {
    super(myHttpClient);
    console.log("Clinician Request Status service initilized");
  }
  getAllClinicianRequests() {
     return this.get(environment.apiUrl + CLINICIAN_REQUEST_STATUS_API_ENDPOINTS.GetClinicianRequestStatus + "?id=" + this.authService.loginUserId);
  }
}
