export enum DocumentTypeEnum {
    All = 0,
    Paperwork = 1,
    RequestDocument = 2,
    UploadDocument = 3,
    ChartReviews = 4,
    ProtocolDocument = 5,
}

export const DocumentTypeEnumDescriptions = new Map<number, string>(
    [
        [DocumentTypeEnum.All, "All"],
        [DocumentTypeEnum.Paperwork, "Paper Work"],
        [DocumentTypeEnum.RequestDocument, "Requested Document"],
        [DocumentTypeEnum.UploadDocument, "Clinical Document"],
        [DocumentTypeEnum.ChartReviews, "Chart Review"],
        [DocumentTypeEnum.ProtocolDocument, "Protocol Document"]
    ]
);