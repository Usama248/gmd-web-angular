import { createAction, props } from "@ngrx/store";

export enum NotificationActionTypes {
     LOAD_NOTIFICATION_COUNT = '[Clinician Request Status] Load Request',
     LOAD_NOTIFICATION_COUNT_SUCCESS = '[Clinician Request Status] Load Success',
     LOAD_NOTIFICATION_COUNT_FAILURE = '[Clinician Request Status] Load Failure'
}

export const NotificationActions = {
     loadNotificationCount: createAction(NotificationActionTypes.LOAD_NOTIFICATION_COUNT),
     loadNotificationCountSuccess: createAction(NotificationActionTypes.LOAD_NOTIFICATION_COUNT_SUCCESS, props<{ data: number  }>()),
     loadNotificationCountFailture: createAction(NotificationActionTypes.LOAD_NOTIFICATION_COUNT_FAILURE, props<{ error: string }>())
}


