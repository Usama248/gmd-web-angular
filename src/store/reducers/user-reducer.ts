import { createReducer, on } from "@ngrx/store";
import { UserProfileModel } from "../../app/models/user/user-profile.model";
import { loadUserDataRequest, loadUserDataFailure, loadUserDataSuccess, updateUserData } from "../actions/user-actions";

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
        ProfileId: "",
        FirstName: "",
        LastName: "",
        Email: "",
        UserName: "",
        PhoneNumber: "",
        FileUrl: "",
        MobilePhone: "",
        ImageString: "",
        IsClinic: false,
        IsClinician: false,
        MobileNumber: "",
        IsVerified: false,
        OrganizationName: "",
        OrganizationId: 0,
        Roles: [],
        IsOwner: false,
        ClinicId: 0,
        HasLabAlertSecret: false,
        HasAssignedAnyLabAlert: false,
        IsClinicOwner: false,
        IsPaymentLocked: false,
        ClinicLabAlertSecretKey: "",
        IsLegacyUser: false
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
    )));

// selectors
export const getLoading = (state: UserDataState) => state.loading;
export const getLoaded = (state: UserDataState) => state.loaded;
export const getUserInfo = (state: UserDataState) => state.userProfileData;
export const getUserError = (state: UserDataState) => state.error;


