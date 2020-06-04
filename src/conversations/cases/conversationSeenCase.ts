import { IConversationsState, IConversationSeenAction } from '../types';

export function conversationSeenCase(
  state: IConversationsState,
  { id }: IConversationSeenAction,
): IConversationsState {
  let conversation = state.conversations.find((c) => c._id === id);
  if (!conversation) return state; // IGNORE

  const lastMessage = conversation.messages[conversation.messages.length - 1];
  conversation = {
    ...conversation,
    lastSeen: lastMessage && lastMessage.createdAt,
    unseenMessages: 0,
  };
  const newState = {
    ...state,
    conversations: [
      ...state.conversations.filter((c) => c._id !== id),
      conversation,
    ]
  };
  newState.conversations.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  newState.unseenMessages = newState.conversations.reduce((res, { unseenMessages }) => res + unseenMessages, 0);
  return newState;
}
