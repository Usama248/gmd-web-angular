
import { DocumentTypeEnum } from "src/app/shared/constants/enums/chart-document-type-enum";
import { ClinicianSignStatusEnum } from "src/app/shared/constants/enums/clinician-sign-status-enum";
import { UserDocumentStatusEnum } from "src/app/shared/constants/enums/user-document-status-enum";
import { ActionStatusEnum } from "src/app/shared/constants/enums/document-action-status-enum";
import {ClinicianDocumentsEnum} from '../../shared/constants/enums/clinician-documents-enum';



export interface ClinicDocumentRequestDTO {
    id: number;
    envelopId: string;
    documentPath: string;
    requestId: string;
    actionId: string;
    jscriptObject: string;
    declinedReason: string;
    signedDocumentPath: string;
    description: string;
    documentType: DocumentTypeEnum;
    fileName: string;
    declineAt: Date;
    clinicianId: number | null;
    clinicId: number | null;
    status: ClinicianDocumentsEnum | null;
    isResubmit: boolean;
    documentResponseStatus: string;
    metaId: string;
    documentId: string;
    sessionId: string;
    userId: string;
    clinicianName: string;
    clinicianEmail: string;
    clinicName: string;
    physicianName: string;
    selfPaperWork: boolean;
    clinicianDocument: File; // Assuming File is the appropriate type, replace with the actual type if different
    createdDate: Date;
    modifiedAt: Date | null;
    dateString: string;
    numberOfRequests: number;
    shortFileName: string;
    isArchived: boolean;
    rejectReassion: string;
    isAccidental: boolean;
    shorDescription: string;
    currentDate: Date;
    cliniciansignStatus: ClinicianSignStatusEnum | null;
    signNowId: string;
    isFirstTimeEdit: boolean | null;
    actionStatus: ActionStatusEnum;
    bucketFileName: string;
    generalDocumentTypeId: number | null;
    generalDocumentType: string;
    hasApprovedProtocolDocumentStatus: UserDocumentStatusEnum;
    selectedService: number | null;
    service: string;
    isReadOnly: boolean;
  }