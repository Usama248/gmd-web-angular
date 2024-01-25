import { ClinicianRequestStatusEnum } from "../../app/shared/constants/enums/clinician-request-status-enum";
import { PhysicianAssignTypeEnum } from "../..//app/shared/constants/enums/physician-assignment-type-enum";

export interface IClinicianRequestStatus {
    id: number;
    clinicId: number;
    clinicianId: number;
    userId: string;
    clinicianName: string;
    clinicName: string;
    clinicUserName: string;
    status: ClinicianRequestStatusEnum;
    statusEnum: any;
    reason: string;
    stateName: string;
    noOfClinics: number;
    approvalDate: string
    csRoles: string
    physicianAssignmentType: PhysicianAssignTypeEnum;
    selectedClinicUserID: string;
    selectedClinicUserName: string;
    services: string[];
    licenseTypeName: string;
    isValidate: boolean;
    createdDate: Date;
}