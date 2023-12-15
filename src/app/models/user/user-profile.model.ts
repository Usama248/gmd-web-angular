export interface UserProfileModel {
    Id? : string;
    ProfileId : string;
    FirstName : string;
    LastName : string;
    Email : string;
    UserName : string;
    PhoneNumber : string;
    FileUrl : string;
    MobilePhone : string;
    ImageString : string;
    IsClinic : boolean;
    IsClinician  : boolean;
    MobileNumber  : string;
    IsVerified : boolean;
    OrganizationName : string;
    OrganizationId : number;
    Roles : string[];
    IsOwner : boolean;
    ClinicId : number;
    HasLabAlertSecret : boolean;
    HasAssignedAnyLabAlert: boolean;
    IsClinicOwner : boolean;
    IsPaymentLocked : boolean;
    ClinicLabAlertSecretKey : string;
    IsLegacyUser : boolean;
  }