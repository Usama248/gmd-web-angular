import { createAction, props } from "@ngrx/store";
import { UserData } from "./user-data.model";

export const loadUserData = createAction('[UserData] Load UserData');
export const loadUserDataSuccess = createAction('[UserData] Load UserData Success', props<{ data: UserData }>());
export const loadUserDataFailure = createAction('[UserData] Load UserData Failure', props<{ error: string }>());
export const updateUserData = createAction('[UserData] Update UserData', props<{ userData: UserData }>());
export const deleteUserData = createAction('[UserData] Delete UserData', props<{ id: string }>());