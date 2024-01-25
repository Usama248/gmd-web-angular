import { createReducer, on } from "@ngrx/store";
import { ConversationModel } from "../../app/models/conversation/conversation-model";
import { ConversationActions } from "../actions/conversation-actions";

export interface ConversationState {
    conversations: ConversationModel[],
    loading: boolean,
    loaded: boolean
}

export const initialState: ConversationState = {
    conversations: [],
    loading: false,
    loaded: false
}

export const ConversationReducer = createReducer(initialState,
    on(ConversationActions.loadConversation, (state) =>
        ({ ...state, loading: true })
    ),
    on(ConversationActions.loadConversationSuccess, (state, { data }) =>
        ({ ...state, conversations: data, loaded: true, loading: false })
    ),
    on(ConversationActions.addConversation, (state, { conversation }) =>
        ({ ...state, conversations:  [...state.conversations, conversation] })
    ),
);
//selector
export const getLoading = (state: ConversationState) => state.loading;
export const getLoaded = (state: ConversationState) => state.loaded;
export const getConversations = (state: ConversationState) => [...state.conversations];

