import { IEnsureConversationAction, ENSURE_CONVERSATION } from '../types';

export function ensureConversation(
  conversationId: string,
  targets: string[],
  createdAt: string,
): IEnsureConversationAction {
  return {
    type: ENSURE_CONVERSATION,
    conversationId,
    targets,
    createdAt,
  };
}
