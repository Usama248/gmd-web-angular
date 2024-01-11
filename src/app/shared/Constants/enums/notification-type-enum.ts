export enum NotificationTypeEnum {
    Urgent = 1,
    Medium,
    Normal,
    PaperWork,
    Minimal,
    DocumentRequest,
    BundleRequest,
    AssignBundle,
    NonUrgentLow,
    NonUrgentHigh,
    ClinicialDocument,
    LicenseInsurance,
    ClinicOnBoardingCompleted,
    SendToGuardian,
}
export const NotificationTypeNames = new Map<number,string>(
    [
        [NotificationTypeEnum.Urgent,'Urgent'],
        [NotificationTypeEnum.Medium,'Medium'],
        [NotificationTypeEnum.Normal,'Normal'],
        [NotificationTypeEnum.PaperWork,'PaperWork'],
        [NotificationTypeEnum.Minimal,'Minimal'],
        [NotificationTypeEnum.DocumentRequest,'Document Request'],
        [NotificationTypeEnum.BundleRequest,'Bundle Request'],
        [NotificationTypeEnum.AssignBundle,'Assign Bundle'],
        [NotificationTypeEnum.NonUrgentLow,'Non Urgent Low Priority'],
        [NotificationTypeEnum.NonUrgentHigh,'Non Urgent High Priority'],
        [NotificationTypeEnum.ClinicialDocument,'Clinicial Document'],
        [NotificationTypeEnum.LicenseInsurance,'License Insurance'],
        [NotificationTypeEnum.ClinicOnBoardingCompleted,'Clinic OnBoarding Complete'],
        [NotificationTypeEnum.SendToGuardian,'Send To Guardian'],
    ]
)
export const NotificationTypeIcons = new Map<number,string>(
    [
        [NotificationTypeEnum.Urgent,'pi pi-video'],
        [NotificationTypeEnum.Medium,'pi pi-file'],
        [NotificationTypeEnum.Normal,'pi pi-comment'],
        [NotificationTypeEnum.PaperWork,'pi pi-file'],
        [NotificationTypeEnum.Minimal,'pi pi-user-plus'],
        [NotificationTypeEnum.DocumentRequest,'pi pi-file'],
        [NotificationTypeEnum.BundleRequest,'Bundle Request'],
        [NotificationTypeEnum.AssignBundle,'Assign Bundle'],
        [NotificationTypeEnum.NonUrgentLow,'pi pi-comment'],
        [NotificationTypeEnum.NonUrgentHigh,'pi pi-comment'],
        [NotificationTypeEnum.ClinicialDocument,'pi pi-file'],
        [NotificationTypeEnum.LicenseInsurance,'pi pi-file'],
        [NotificationTypeEnum.ClinicOnBoardingCompleted,'Clinic OnBoarding Complete'],
        [NotificationTypeEnum.SendToGuardian,'pi pi-file'],
    ]
)

