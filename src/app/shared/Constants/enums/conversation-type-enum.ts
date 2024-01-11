export enum ConversationTypeEnum {
    Urgent = 1,
    NonUrgent
}
export const ConversationTypeEnumNames =new Map<number,string>(
    [
        [ConversationTypeEnum.Urgent,'Urgent'],
        [ConversationTypeEnum.NonUrgent,'Non Urgent'],
    ]
)
export const ConversationTypeEnumColor =new Map<number,string>(
    [
        [ConversationTypeEnum.Urgent,'p-tag-danger'],
        [ConversationTypeEnum.NonUrgent,'p-tag-success'],
    ]
)