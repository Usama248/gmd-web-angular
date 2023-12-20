import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CLINIC_API_ENDPOINTS } from 'src/app/shared/constants/api-endpoint-url';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClinicService extends ApiHandler {

  constructor(myHttpClient: HttpClient) {
    super(myHttpClient);
    console.log("Clinician Request Status service initilized");
  }
  getClinicDashboardData() {
     return this.get(environment.apiUrl + CLINIC_API_ENDPOINTS.GetDashboardForClinic);
  }
}
