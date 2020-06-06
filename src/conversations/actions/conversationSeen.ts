import { IConversationSeenAction, CONVERSATION_SEEN } from '../types';

export function conversationSeen(id: string, seenDate: string): IConversationSeenAction {
  return {
    type: CONVERSATION_SEEN,
    id,
    seenDate,
  };
}
