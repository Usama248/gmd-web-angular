export enum UserDocumentStatusEnum {
    NoUserAssigned = 0,
    SomeUsersApproved = 1,
    NoUsers = 2,
    AllUsersApproved = 3,
}

export const UserDocumentStatusEnumDescriptions = new Map<number, string>(
    [
        [UserDocumentStatusEnum.NoUserAssigned, "No User Assigned"],
        [UserDocumentStatusEnum.SomeUsersApproved, "Some Users Approved"],
        [UserDocumentStatusEnum.NoUsers, "No User Approved"],
        [UserDocumentStatusEnum.AllUsersApproved, "All Users Approved"],
    ]
);