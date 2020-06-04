import { IConversationSeenAction, CONVERSATION_SEEN } from '../types';

export function conversationSeen(id: string): IConversationSeenAction {
  return {
    type: CONVERSATION_SEEN,
    id,
  };
}
