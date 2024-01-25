export enum ConversationRouteType {
    ProtocolOrDocumentRelated = 1,
    ClinicalQuestion = 2,
    Other = 3
}

export const ConversationRouteTypeDescription = new Map<number,string>(
    [
        [ConversationRouteType.ProtocolOrDocumentRelated,"Protocol or Document Related"],
        [ConversationRouteType.ClinicalQuestion,"Clinical Questions"],
        [ConversationRouteType.Other,"Other"]
    ]
);