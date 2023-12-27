import { createReducer, on } from "@ngrx/store";
import { UserProfileModel } from "../../app/models/user/user-profile.model";
import { loadUserDataRequest, loadUserDataFailure, loadUserDataSuccess, updateUserData, logout } from "../actions/user-actions";

export interface UserDataState {
    userProfileData: UserProfileModel;
    loading: boolean;
    loaded: boolean;
    error: string;
}
export const initialState: UserDataState = {
    loading: false,
    loaded: false,
    error: "",
    userProfileData : {
        profileId: "",
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        phoneNumber: "",
        fileUrl: "",
        mobilePhone: "",
        imageString: "",
        isClinic: false,
        isClinician: false,
        mobileNumber: "",
        isVerified: false,
        organizationName: "",
        organizationId: 0,
        roles: [],
        isOwner: false,
        clinicId: 0,
        hasLabAlertSecret: false,
        hasAssignedAnyLabAlert: false,
        isClinicOwner: false,
        isPaymentLocked: false,
        clinicLabAlertSecretKey: "",
        isLegacyUser: false
    }
};
export const UserDataReducer = createReducer(initialState,

    on(loadUserDataRequest, (state) => (
        { ...state, loading: true }
    )),

    on(loadUserDataSuccess, (state, { data }) => (
        { ...state, userProfileData: data, loading: false, loaded: true, error: "" }
    )),

    on(loadUserDataFailure, (state, { error }) => (
        { ...state, error: error, loading: false, loaded: false }
    )),
    on(logout, (state) => (
        { ...state, error: "", loading: false, loaded: false }
    )));

// selectors
export const getLoading = (state: UserDataState) => state.loading;
export const getLoaded = (state: UserDataState) => state.loaded;
export const getUserInfo = (state: UserDataState) => state.userProfileData;
export const getUserError = (state: UserDataState) => state.error;
