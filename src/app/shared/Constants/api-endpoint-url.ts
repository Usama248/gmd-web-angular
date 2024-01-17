import { environment } from "src/environments/environment";

export const API_URL: string = environment.apiUrl;

export const AUTH_API_ENDPOINTS = {
    Login: '/api/Auth/login',
    ForgotPassToken: '/api/Auth/ForgotToken',
    ResetPassword: '/api/Auth/ResetPassword',
    GetProfile: '/api/Auth/GetProfile',
    ChangePassword: '/api/Auth/ChangePassword' 
};


export const CLINICIAN_REQUEST_STATUS_API_ENDPOINTS = {
    GetClinicianRequestStatus: API_URL + '/api/ClinicianRequestStatus/GetClinicianRequestStatus',
};

export const CLINIC_API_ENDPOINTS = {
    GetDashboardForClinic: '/api/Clinic/GetDashboardForClinic',
};

export const NOTIFICATIONS_ENDPOINTS = {
    GetCountOfNotification : "/api/Notification/GetCountOfNotification",
    GetLastestUnReadNotifications: "/api/Notification/GetLastestUnReadNotifications"
}

export const CONVERSATION_ENDPOINTS = {
   GetAllConversationsForClinic : API_URL +  "/api/VideoCall/GetAllVideoCall",
   GetRoomCredentials: API_URL +  "/api/Room/GetRoomCredentials",
   GetParticipantMessages: API_URL +  "/api/Conversation/GetParticipantMessages",
}

export const CLINIC_DOCUMENT_ENDPOINTS = {
    GetClinicChartReviewDocuments:  API_URL + "/api/ClinicDocument/GetClinicChartReviewDocuments",
    GetClinicOnBoardDocuments:  API_URL + "/api/ClinicDocument/GetClinicOnBoardDocuments"
}