import { IEnsureConversationAction, ENSURE_CONVERSATION } from '../types';

export function ensureConversation(
  conversationId: string,
  conversationTarget: string,
  createdAt: string,
): IEnsureConversationAction {
  return {
    type: ENSURE_CONVERSATION,
    conversationId,
    conversationTarget,
    createdAt,
  };
}
