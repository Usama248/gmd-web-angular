import { ConversationRouteType } from "src/app/shared/constants/enums/conversation-route-type";
import { ConversationTypeEnum } from "src/app/shared/constants/enums/conversation-type-enum";

export interface ConversationModel {
    id: number;
    title: string;
    conversationName: string;
    creatorName: string;
    primaryPhysicianName: string;
    description: string;
    startDate: Date;
    endDate?: Date | null;
    room_Status: number;
    created_Date: Date;
    clinicId?: number | null;
    clinicname: string;
    conversationForName: string;
    userOffset: string;
    userTimezone: string;
    userTimezoneDetail: string;
    shortDescription: string;
    conversationType: ConversationTypeEnum;
    clinicianList: SelectListItem[];
    primaryPhysician: number;
    backUpPhysicianId?: number | null;
    primaryPhysicianNotificationSend: boolean;
    hasNonJoin: boolean;
    isArchived: boolean;
    clinicJoinDate?: Date | null;
    hasClinicJoin: boolean;
    sDate: string;
    eDate: string;
    createDate: string;
    conversationForUserId: string;
    conversationRouteType?: ConversationRouteType;
    isReadOnly: boolean;
  }
  
  export interface SelectListItem {
    text: string;
    value : string;
  }