import { ActionReducerMap, createSelector } from "@ngrx/store";
import  * as fromUser from "./user-reducer";
import  * as fromClinicRequestStatus from "./clinic-request-status-reducer";
import * as fromNotificationState from "./notificaation-reducer";
import * as fromConversationState from "./conversation-reducer";
//stores
export interface RootReducerState {
  userProfileStore: fromUser.UserDataState
  clinicianRequestStatusStore: fromClinicRequestStatus.ClinicianRequestStatusState
  notificationStore: fromNotificationState.NotificationState
  conversationStore: fromConversationState.ConversationState
};

//reducers
export const rootReducer: ActionReducerMap<RootReducerState> = {
  userProfileStore: fromUser.UserDataReducer,
  clinicianRequestStatusStore : fromClinicRequestStatus.ClinicianRequestStatusReducer,
  notificationStore: fromNotificationState.NotificationReducer,
  conversationStore: fromConversationState.ConversationReducer,
};

// states
export const getUserState =  (state: RootReducerState) => state.userProfileStore;
export const getClinicianRequestStatusState = (state: RootReducerState) => state.clinicianRequestStatusStore;
export const getNotificationState = (state: RootReducerState) => state.notificationStore;
export const getConversationState = (state: RootReducerState) => state.conversationStore;

//selectors
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserInfo = createSelector(getUserState, fromUser.getUserInfo);
export const getUserError = createSelector(getUserState, fromUser.getUserError);

export const getClinicianRequestStatusLoading = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getLoading)
export const getClinicianRequestStatusLoaded = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getLoaded)
export const getClinicianRequestStatusStoreData = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getclinicianRequestStatusData)
export const getClinicianRequestStatusError = createSelector(getClinicianRequestStatusState, fromClinicRequestStatus.getclinicianRequestStatusError)

export const getNotificationLoading = createSelector(getNotificationState, fromNotificationState.getLoading)
export const getNotificationLoaded = createSelector(getNotificationState, fromNotificationState.getLoaded)
export const getNotificationCount = createSelector(getNotificationState, fromNotificationState.getNotificationCount)
export const getNotificationError = createSelector(getNotificationState, fromNotificationState.getNotificationCountError)

export const getConversationsLoading = createSelector(getConversationState, fromConversationState.getLoading)
export const getConversationsLoaded = createSelector(getConversationState, fromConversationState.getLoaded)
export const getConversations = createSelector(getConversationState, fromConversationState.getConversations)







