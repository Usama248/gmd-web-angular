import { ClinicianDocumentsEnum } from "src/app/shared/constants/enums/clinician-documents-enum";

export interface ClinicDocumentRequestModel
{
    id: number;
    documentPath: string;
    declinedReason: string;
    signedDocumentPath : string;
    description : string;
    documentType : number;
    fileName : string;
    declineAt : Date;
    clinicianId : number;
    clinicId : number;
    status: ClinicianDocumentsEnum;
    isResubmit : boolean;
    documentResponseStatus: string;
    metaId : string;
    documentId : string;
    sessionId : string;
    userId : string;
    clinicianName : string;
    clinicianEmail : string;
    clinicName : string;
    physicianName : string;
    SelfPaperWork : boolean;
    ClinicianDocument : File;
    createdDate : Date;
    modifiedAt : Date;
    dateString : string;
    numberOfRequests : number;
}