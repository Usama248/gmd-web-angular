export interface UserProfileModel {
    id? : string;
    profileId : string;
    firstName : string;
    lastName : string;
    email : string;
    userName : string;
    phoneNumber : string;
    fileUrl : string;
    mobilePhone : string;
    imageString : string;
    isClinic : boolean;
    isClinician  : boolean;
    mobileNumber  : string;
    isVerified : boolean;
    organizationName : string;
    organizationId : number;
    roles : string[];
    isOwner : boolean;
    clinicId : number;
    hasLabAlertSecret : boolean;
    hasAssignedAnyLabAlert: boolean;
    isClinicOwner : boolean;
    isPaymentLocked : boolean;
    clinicLabAlertSecretKey : string;
    isLegacyUser : boolean;
  }