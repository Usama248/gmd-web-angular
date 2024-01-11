import { IClinicianRequestStatus } from "../interfaces/clinician-request-status.interface";

export class ClinicianRequestStatus implements IClinicianRequestStatus {
    id = 0;
    clinicId = 0;
    clinicianId = 0;
    userId = "";
    clinicianName= "";
    clinicName= "";
    clinicUserName= "";
    status = 0;
    statusEnum= undefined;
    reason= "";
    stateName= "";
    noOfClinics= 0;
    approvalDate= "";
    csRoles= "";
    physicianAssignmentType= 0;
    selectedClinicUserID= "";
    selectedClinicUserName= "";
    services= [];
    licenseTypeName= "";
    isValidate= false;
    createdDate = new Date;
}