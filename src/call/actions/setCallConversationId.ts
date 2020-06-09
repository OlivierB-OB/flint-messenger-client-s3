import { ISetCallConversationIdAction, SET_CALL_CONVERSATION_ID } from '../types';

export function setCallConversationId(conversationId: string): ISetCallConversationIdAction {
  return {
    type: SET_CALL_CONVERSATION_ID,
    conversationId,
  };
}
