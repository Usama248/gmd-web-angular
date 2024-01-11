import { createAction, props } from "@ngrx/store";
import { IClinicianRequestStatus } from "src/index-db/interfaces/clinician-request-status.interface";

export enum ClinicianRequestStatusActionTypes {
     LOAD_REQUEST = '[Clinician Request Status] Load Request',
     LOAD_SUCCESS = '[Clinician Request Status] Load Success',
     LOAD_FAILURE = '[Clinician Request Status] Load Failure'
} 

export const ClinicianRequestStatusActions = {
     loadRequest: createAction(ClinicianRequestStatusActionTypes.LOAD_REQUEST),
     loadRequestSuccess: createAction(ClinicianRequestStatusActionTypes.LOAD_SUCCESS, props<{ data: IClinicianRequestStatus[] }>()),
     loadRequestFailture: createAction(ClinicianRequestStatusActionTypes.LOAD_FAILURE, props<{ error: string }>())
}


