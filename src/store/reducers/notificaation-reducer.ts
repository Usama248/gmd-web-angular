import { createReducer, on } from "@ngrx/store"
import { NotificationActions } from "../actions/notification-action";

export interface NotificationState {
    notificationCount: number,
    loading: boolean,
    loaded: boolean,
    error: string
}

export const initialState: NotificationState = {
    notificationCount: 0,
    loading: false,
    loaded: false,
    error: ""
}

export const NotificationReducer = createReducer(initialState,
    on(NotificationActions.loadNotificationCount, (state) => (
        { ...state, loading: true }
    )),
    on(NotificationActions.loadNotificationCountSuccess, (state, {data}) => (
        { ...state, notificationCount: data, loading: false, loaded: true }
    )),
    on(NotificationActions.loadNotificationCountFailture, (state, { error }) => (
        { ...state, error: error, loading: false, loaded: false }
    )),
    on(NotificationActions.loadReceiveNewNotification, (state) => (
        {...state, notificationCount: (state.notificationCount+ 1)}
    ))
);

//selectors
export const getLoading = (state: NotificationState) => state.loading;
export const getLoaded = (state: NotificationState) => state.loaded;
export const getNotificationCount= (state: NotificationState) => state.notificationCount;
export const getNotificationCountError = (state: NotificationState) => state.error;