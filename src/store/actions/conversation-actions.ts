import { createAction, props } from "@ngrx/store";
import { ConversationModel } from "src/app/models/conversation/conversation-model";

export enum ConversationActionsEnum {
    LOAD_CONVERSATION =  '[Conversation] Load Request',
    LOAD_CONVERSATION_SUCCESS = '[Conversation] Load Success',
    ADD_CONVERSATION = '[Conversation] Add Conversation',
}

export const ConversationActions = {
  loadConversation : createAction(ConversationActionsEnum.LOAD_CONVERSATION),
  loadConversationSuccess: createAction(ConversationActionsEnum.LOAD_CONVERSATION_SUCCESS, props<{data: ConversationModel[]}>()),
  addConversation: createAction(ConversationActionsEnum.ADD_CONVERSATION, props<{conversation: ConversationModel}>())
}