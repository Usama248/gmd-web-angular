import { ClinicianDocumentsEnum } from "src/app/enums/clinician-documents-enum";

export interface ClinicianRequestStatusModel {
    Id: number;
    ClinicId: number;
    ClinicianId: number;
    UserId: string;
    clinicianName: string;
    ClinicName: string;
    ClinicUserName: string;
    status: ClinicianDocumentsEnum;
    Reason: string;
    StateName: string;
    NoOfClinics: number;
    ApprovalDate: string
    CsRoles: string
    PhysicianAssignmentType: number;
    SelectedClinicUserID: string;
    SelectedClinicUserName: string;
    Services: string[];
    LicenseTypeName: string;
    IsValidate: boolean;
    createdDate: Date;
}