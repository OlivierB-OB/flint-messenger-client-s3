import { ICreateConversationAction, CREATE_CONVERSATION } from '../types';

export function createConversation(conversationId: string, targets: string[]): ICreateConversationAction {
  return {
    type: CREATE_CONVERSATION,
    conversationId,
    targets,
  };
}
