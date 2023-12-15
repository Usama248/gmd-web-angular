import { ActionReducerMap, createSelector } from "@ngrx/store";
import  * as fromUser from "./user-reducer";

export interface RootReducerState {
  userProfileStore: fromUser.UserDataState
};

export const rootReducer: ActionReducerMap<RootReducerState> = {
  userProfileStore: fromUser.UserDataReducer
};

export const getUserState =  (state: RootReducerState) => state.userProfileStore;

export const getUserLoading = createSelector(getUserState, fromUser.getLoading)
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded)
export const getUserInfo = createSelector(getUserState, fromUser.getUserInfo)
export const getUserError = createSelector(getUserState, fromUser.getUserError)

