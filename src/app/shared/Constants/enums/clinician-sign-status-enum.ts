export enum ClinicianSignStatusEnum {
    ESignature = 1,
    WithoutSignature = 2,
    SignWithInk = 3,
    MarkAsAccidental = 4,
    Archived = 5,
}

export const ClinicianSignStatusEnumDescriptions = new Map<number, string>(
    [
        [ClinicianSignStatusEnum.ESignature, "E-Signature"],
        [ClinicianSignStatusEnum.WithoutSignature, "Without Signature"],
        [ClinicianSignStatusEnum.SignWithInk, "Sign With Ink"],
        [ClinicianSignStatusEnum.MarkAsAccidental, "Mark As Accidental"],
        [ClinicianSignStatusEnum.Archived, "Archived"]
    ]
);