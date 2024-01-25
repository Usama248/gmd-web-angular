import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONVERSATION_ENDPOINTS } from 'src/app/shared/constants/api-endpoint-url';
import { ApiHandler } from 'src/app/shared/services/api-handler.service';
import { CreateConversationRequestModel } from 'src/app/models/conversation/create-conversation-request-model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService extends ApiHandler {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
  getAllConversataionsForClinic(isPast = false, userId: string) {
    const params = new HttpParams()
      .set('id', userId)
      .set('GetPast', isPast.toString())
      .set('TimeZone', '')
      .set('skip', '0')
      .set('Take', '-1')
      .set('PlateForm', '2');
    return this.getByParameteres(CONVERSATION_ENDPOINTS.GetAllConversationsForClinic, params)
  }
  getRoomCredentials(roomKey: number, userId: number) {
    const params = new HttpParams()
      .set('uid', userId)
      .set('roomkey', roomKey)
    return this.getByParameteres(CONVERSATION_ENDPOINTS.GetRoomCredentials, params)
  }
  getOldMessages(roomKey: number, userId: string) {
    const params = new HttpParams()
      .set('UserId', userId)
    return this.getByParameteres(CONVERSATION_ENDPOINTS.GetParticipantMessages + "/" +roomKey, params)
  }

  
  getPhyscians(){
    return this.get(CONVERSATION_ENDPOINTS.ClinicianRequestStatus)
  }

  getPhysicianRolesById(id:number,clinicId:number){
    const params = new HttpParams()
          .set('id',id)
          .set('clinicId',clinicId)
    return this.getByParameteres(CONVERSATION_ENDPOINTS.GetPhysicianRolesById,params)
  }

  postSaveRoomCall(data:CreateConversationRequestModel){
    return this.post(CONVERSATION_ENDPOINTS.PostVideoCall,data)
  }
}
