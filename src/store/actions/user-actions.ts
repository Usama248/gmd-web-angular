import { createAction, props } from "@ngrx/store";
import { UserProfileModel } from "../../app/models/user/user-profile.model";


export enum UserActionTypes {
    LOAD_REQUEST  = '[User Auth] Load Request',
    LOAD_SUCCESS   = '[User Auth] Load Success',
    LOAD_FAILURE   = '[User Auth] Load Failure',
    LOAD_UPDATE  = '[User Auth] Load Update',
    LOGOUT = 'Logout',
  }

export const loadUserDataRequest = createAction(UserActionTypes.LOAD_REQUEST);
export const loadUserDataSuccess = createAction(UserActionTypes.LOAD_REQUEST, props<{ data: UserProfileModel }>());
export const loadUserDataFailure = createAction(UserActionTypes.LOAD_FAILURE, props<{ error: string }>());
export const updateUserData = createAction('[UserData] Update UserData', props<{ data: UserProfileModel }>());
export const logout = createAction(UserActionTypes.LOGOUT);
