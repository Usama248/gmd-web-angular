import { IClinicianRequestStatus } from "src/index-db/interfaces/clinician-request-status.interface";
import { ClinicDocumentRequestModel } from "../document/clinic-document-request-model";

export interface ClinicDashboardModel
{
    clinicianDetail : CliniciansForClinic
    documentsDetail : DocumentsForClinic
    labAlertForClinician : LabAlertForClinician 
}

export interface CliniciansForClinic
{
    cliniciansList : IClinicianRequestStatus[];
    approvedCliniciansCount : number;
    pendingCliniciansCount  : number;
    rejectedCliniciansCount  : number;
    answerCallsPercentage  : number;
    answerCallsAvarage  : number;
    chartReviewCompletionHours : number;
}
export interface DocumentsForClinic
{
    documentList : ClinicDocumentRequestModel[];
    signedDocumentCount : number;
    pendingdocumentCount : number;
}
export interface LabAlertForClinician
{
    pending: number
}
