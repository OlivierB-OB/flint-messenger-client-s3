import { IConversationsState, IUpdateConversationAction } from '../types';
import { conversationFactory } from './conversationFactory';

export function updateConversationCase(
  state: IConversationsState,
  { data }: IUpdateConversationAction,
): IConversationsState {
  let conversation = state.conversations.find((c) => c._id === data.conversationId);
  if (!conversation) conversation = conversationFactory(data.conversationId, data.emitter, data.createdAt);
  conversation = {
    ...conversation,
    messages: [...conversation.messages, { ...data }],
    updatedAt: data.createdAt,
  };
  conversation.messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  const { lastSeen } = conversation;
  conversation.unseenMessages = conversation.messages.slice(
    lastSeen ? conversation.messages.findIndex(({ createdAt }) => createdAt > lastSeen) : 0,
  ).length;
  const newState = {
    ...state,
    conversations: [
      ...state.conversations.filter((c) => c._id !== data.conversationId),
      conversation,
    ]
  };
  newState.conversations.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  newState.unseenMessages = newState.conversations.reduce((res, { unseenMessages }) => res + unseenMessages, 0);
  return newState;
}
