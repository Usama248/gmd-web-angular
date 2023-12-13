import { createReducer, on } from "@ngrx/store";
import { UserData } from "./user-data.model";
import { deleteUserData, loadUserData, loadUserDataFailure, loadUserDataSuccess, updateUserData } from "./actions";

export interface UserDataState {
    UserData: UserData;
    loading: boolean;
    error: string;
    }
    export const initialState: UserDataState = {
    UserData: {
        Id: "",
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
    },
    loading: false,
    error: ''
    };
    export const userDataReducer = createReducer(
    initialState,
    
    on(loadUserData, (state : any) => ({ ...state, loading: true })),
    
    on(loadUserDataSuccess, (state : any, { data }) =>(
        { ...state, data, loading: false }
        )),
    
    on(loadUserDataFailure, (state : any, { error }) => ({ ...state, error, loading: false })),
    
    on(updateUserData, (state : any, { userData }) => ({ ...state, todos: state.todos.map((t :any) => t.id === userData.Id ? userData : t) })),
    
    on(deleteUserData, (state : any, { id }) => ({ ...state, todos: state.todos.filter((t :any) => t.id !== id) })),
    );