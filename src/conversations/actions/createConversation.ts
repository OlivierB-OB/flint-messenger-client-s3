import { ICreateConversationAction, CREATE_CONVERSATION } from '../types';

export function createConversation(conversationId: string, targetId: string): ICreateConversationAction {
  return {
    type: CREATE_CONVERSATION,
    conversationId,
    targetId,
  };
}
