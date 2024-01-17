import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { CLINIC_DOCUMENT_ENDPOINTS } from 'src/app/shared/constants/api-endpoint-url';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentService extends ApiHandler {

  constructor(myHttpClient: HttpClient,
    private authService: AuthService
    ) { 
    super(myHttpClient);
    console.log("clinic document service started.............");
  }

  getClinicActiveChartReviewDocuments(){
    return this.get(CLINIC_DOCUMENT_ENDPOINTS.GetClinicChartReviewDocuments + "/0");
  }

  getClinicCompletedChartReviewDocuments(){
    return this.get(CLINIC_DOCUMENT_ENDPOINTS.GetClinicChartReviewDocuments + "/3");
  }

  getActiveClinicOnBoardDocuments(){
    return this.get(CLINIC_DOCUMENT_ENDPOINTS.GetClinicOnBoardDocuments + "/" + this.authService.loginUserId + "/0");
  }

  getCompletedClinicOnBoardDocuments(){
    return this.get(CLINIC_DOCUMENT_ENDPOINTS.GetClinicOnBoardDocuments + "/" + this.authService.loginUserId + "/3");
  }
}
