import { IUpdateConversationAction, UPDATE_CONVERSATION, IConversationMessage } from '../types';

export function updateConversation(
  conversationId: string,
  targets: string[],
  lastSeen: string | undefined,
  messages: IConversationMessage[],
): IUpdateConversationAction {
  return {
    type: UPDATE_CONVERSATION,
    conversationId,
    targets,
    lastSeen,
    messages,
  };
}
