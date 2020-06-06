import { IUpdateConversationAction, UPDATE_CONVERSATION, IConversationMessage } from '../types';

export function updateConversation(
  conversationId: string,
  conversationTarget: string,
  lastSeen: string | undefined,
  messages: IConversationMessage[],
): IUpdateConversationAction {
  return {
    type: UPDATE_CONVERSATION,
    conversationId,
    conversationTarget,
    lastSeen,
    messages,
  };
}
