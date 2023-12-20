import { createReducer, on } from "@ngrx/store"
import { ClinicianRequestStatusModel } from "src/app/models/clinician-request-status/clinician-request-status.model"
import { ClinicianRequestStatusActions } from "../actions/clinician-request-status-action"

export interface ClinicianRequestStatusState {
    clinicianRequestStatusData: ClinicianRequestStatusModel[],
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
export const getclinicianRequestStatusData = (state: ClinicianRequestStatusState) => state.clinicianRequestStatusData;
export const getclinicianRequestStatusError = (state: ClinicianRequestStatusState) => state.error;