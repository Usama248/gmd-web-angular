export enum ClinicianDocumentsEnum {
    All = 0,
    Submitted = 1,
    Reviewed = 2,
    Complete = 3,
    Declined = 4,
    Draft = 5,
    Pending = 6,
    Rejected = 7,
    SendToPHhy = 8,
}
export const ClinicianDocumentsEnumNames =new Map<number,string>(
    [
        [ClinicianDocumentsEnum.All,'All'],
        [ClinicianDocumentsEnum.Submitted,'Submitted'],
        [ClinicianDocumentsEnum.Reviewed,'Reviewed'],
        [ClinicianDocumentsEnum.Complete,'Complete'],
        [ClinicianDocumentsEnum.Declined,'Declined'],
        [ClinicianDocumentsEnum.Draft,'Draft'],
        [ClinicianDocumentsEnum.Pending,'Pending'],
        [ClinicianDocumentsEnum.Rejected,'Rejected'],
        [ClinicianDocumentsEnum.SendToPHhy,'Sent for review to Guardian'],
    ]
)

export const ClinicianDocumentsEnumTagColors = new Map<number,string>(
    [
        [ClinicianDocumentsEnum.All,'primary'],
        [ClinicianDocumentsEnum.Submitted,'warning'],
        [ClinicianDocumentsEnum.Reviewed,'success'],
        [ClinicianDocumentsEnum.Complete,'success'],
        [ClinicianDocumentsEnum.Declined,'danger'],
        [ClinicianDocumentsEnum.Draft,'primary'],
        [ClinicianDocumentsEnum.Pending,'warning'],
        [ClinicianDocumentsEnum.Rejected,'danger'],
        [ClinicianDocumentsEnum.SendToPHhy,'info']
    ]
)