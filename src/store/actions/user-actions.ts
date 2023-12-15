import { createAction, props } from "@ngrx/store";
import { UserProfileModel } from "../../app/models/user/user-profile.model";


export enum UserActionTypes {
    LOAD_REQUEST  = '[My Feature] Load Request',
    LOAD_SUCCESS   = '[My Feature] Load Success',
    LOAD_FAILURE   = '[My Feature] Load Failure',
    LOAD_UPDATE  = '[My Feature] Load Update',
    LOGOUT = 'Logout',
  }

export const loadUserDataRequest = createAction(UserActionTypes.LOAD_REQUEST);
export const loadUserDataSuccess = createAction(UserActionTypes.LOAD_REQUEST, props<{ data: UserProfileModel }>());
export const loadUserDataFailure = createAction(UserActionTypes.LOAD_FAILURE, props<{ error: string }>());
export const updateUserData = createAction('[UserData] Update UserData', props<{ data: UserProfileModel }>());