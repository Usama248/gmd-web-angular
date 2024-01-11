import { createReducer, on } from "@ngrx/store"
import { ClinicianRequestStatusActions } from "../actions/clinician-request-status-action"
import { IClinicianRequestStatus } from "src/index-db/interfaces/clinician-request-status.interface"

export interface ClinicianRequestStatusState {
    clinicianRequestStatusData: IClinicianRequestStatus[],
    loading: boolean,
    loaded: boolean,
    error: string
}

export const initialState: ClinicianRequestStatusState = {
    clinicianRequestStatusData: [],
    loading: false,
    loaded: false,
    error: ""
}

export const ClinicianRequestStatusReducer = createReducer(initialState,
    on(ClinicianRequestStatusActions.loadRequest, (state) => (
        { ...state, loading: true }
    )),
    on(ClinicianRequestStatusActions.loadRequestSuccess, (state, {data}) => (
        { ...state, clinicianRequestStatusData: data, loading: false, loaded: true }
    )),
    on(ClinicianRequestStatusActions.loadRequestFailture, (state, { error }) => (
        { ...state, error: error, loading: false, loaded: false }
    )));

//selectors
export const getLoading = (state: ClinicianRequestStatusState) => state.loading;
export const getLoaded = (state: ClinicianRequestStatusState) => state.loaded;
export const getclinicianRequestStatusData = (state: ClinicianRequestStatusState) => [...state.clinicianRequestStatusData];
export const getclinicianRequestStatusError = (state: ClinicianRequestStatusState) => state.error;