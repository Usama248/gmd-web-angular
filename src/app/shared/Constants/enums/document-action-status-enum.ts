export enum ActionStatusEnum {
    NoAction = 0,
    SendToGuardian = 1,
    ApprovedByGuardian = 2,
}

export const ActionStatusEnumDescriptions = new Map<number, string>(
    [
        [ActionStatusEnum.NoAction, "No Action"],
        [ActionStatusEnum.SendToGuardian, "Send To Guardian"],
        [ActionStatusEnum.ApprovedByGuardian, "Approved By Guardian"],
    ]
);


