import { createAction, props } from "@ngrx/store";

export enum NotificationActionTypes {
     LOAD_NOTIFICATION_COUNT = '[Notification] Load Request',
     LOAD_NOTIFICATION_COUNT_SUCCESS = '[Notification] Load Success',
     LOAD_RECEIVE_NEW_NOTIFICATION = '[Notification] New Notification Received',
     LOAD_NOTIFICATION_COUNT_FAILURE = '[Notification] Load Failure'
}

export const NotificationActions = {
     loadNotificationCount: createAction(NotificationActionTypes.LOAD_NOTIFICATION_COUNT),
     loadNotificationCountSuccess: createAction(NotificationActionTypes.LOAD_NOTIFICATION_COUNT_SUCCESS, props<{ data: number  }>()),
     loadReceiveNewNotification : createAction(NotificationActionTypes.LOAD_RECEIVE_NEW_NOTIFICATION),
     loadNotificationCountFailture: createAction(NotificationActionTypes.LOAD_NOTIFICATION_COUNT_FAILURE, props<{ error: string }>())
}


