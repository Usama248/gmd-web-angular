export interface CreateConversationRequestModel{
    title:string;
    description:string;
    primaryPhysician:number;
    conversationRouteType:number;
    conversationType:number
    selectedClinicId:number;
    clinicId:number;
    useroffset:string;
    usertimezone:string;
    userId:string;
    numericUserId:number;
}   