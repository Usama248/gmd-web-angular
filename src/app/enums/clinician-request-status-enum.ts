export enum ClinicianRequestStatusEnum {
    InProgress = 1,
    Approved = 2,
    Rejected = 3,
    UnAssigned = 4,
}
export const ClinicianRequestStatusNames =new Map<number,string>(
    [
        [ClinicianRequestStatusEnum.InProgress,'Pending'],
        [ClinicianRequestStatusEnum.Approved,'Approved'],
        [ClinicianRequestStatusEnum.Rejected,'Rejected'],
        [ClinicianRequestStatusEnum.UnAssigned,'UnAssigned'],
    ]
)

export const ClinicianRequestStatusTagColors = new Map<number,string>(
    [

        [ClinicianRequestStatusEnum.InProgress,'warning'],
        [ClinicianRequestStatusEnum.Approved,'success'],
        [ClinicianRequestStatusEnum.Rejected,'danger'],
        [ClinicianRequestStatusEnum.UnAssigned,'danger'],
    ]
)