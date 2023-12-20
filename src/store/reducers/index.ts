import { ActionReducerMap, createSelector } from "@ngrx/store";
import  * as fromUser from "./user-reducer";
import  * as fromClinicRequestStatus from "./clinic-request-status-reducer";

//stores
export interface RootReducerState {
  userProfileStore: fromUser.UserDataState
  clinicianRequestStatusStore: fromClinicRequestStatus.ClinicianRequestStatusState
};

//reducers
export const rootReducer: ActionReducerMap<RootReducerState> = {
  userProfileStore: fromUser.UserDataReducer,
  clinicianRequestStatusStore : fromClinicRequestStatus.ClinicianRequestStatusReducer
};

// states
export const getUserState =  (state: RootReducerState) => state.userProfileStore;
export const getClinicianRequestStatusState = (state: RootReducerState) => state.clinicianRequestStatusStore;

//selectors
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserInfo = createSelector(getUserState, fromUser.getUserInfo);
export const getUserError = createSelector(getUserState, fromUser.getUserError);

export const getClinicianRequestStatusLoading = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getLoading)
export const getClinicianRequestStatusLoaded = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getLoaded)
export const getClinicianRequestStatusStoreData = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getclinicianRequestStatusData)
export const getClinicianRequestStatusError = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getclinicianRequestStatusError)





