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
        [ClinicianDocumentsEnum.All,'p-tag-primary'],
        [ClinicianDocumentsEnum.Submitted,'p-tag-warning'],
        [ClinicianDocumentsEnum.Reviewed,'p-tag-success'],
        [ClinicianDocumentsEnum.Complete,'p-tag-success'],
        [ClinicianDocumentsEnum.Declined,'p-tag-danger '],
        [ClinicianDocumentsEnum.Draft,'p-tag-primary'],
        [ClinicianDocumentsEnum.Pending,'p-tag-warning'],
        [ClinicianDocumentsEnum.Rejected,'p-tag-danger '],
        [ClinicianDocumentsEnum.SendToPHhy,'p-tag-info']
    ]
)