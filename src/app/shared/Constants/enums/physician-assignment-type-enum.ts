export enum PhysicianAssignTypeEnum {
    Clinic = 1,
    User = 2,
}
export const PhysicianAssignTypeNames =new Map<number,string>(
    [
        [PhysicianAssignTypeEnum.Clinic, 'Clinic'],
        [PhysicianAssignTypeEnum.User,' User'],
    ]
)

export const PhysicianAssignTypeTagColors = new Map<number,string>(
    [
        [PhysicianAssignTypeEnum.Clinic,'p-tag-primary'],
        [PhysicianAssignTypeEnum.User,'p-tag-warning'],
    ]
)