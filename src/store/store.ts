import { Action, ActionReducer, createFeatureSelector, createSelector, select } from "@ngrx/store";
import { UserDataState, userDataReducer } from "./reducer";
import { UserDataEffects } from "./effects";
import { UserData } from "./user-data.model";

export interface AppState {
    userData: UserDataState
  }
  
  export interface AppStore {
    userData: ActionReducer<UserDataState, Action>;
  }
  
  export const appStore: AppStore = {
    userData: userDataReducer
  }
  
  export const appEffects = [UserDataEffects];

const userDataState = createFeatureSelector<UserData>('userData');

export const selectUserData = createSelector(userDataState, state => {
  return state
});

  