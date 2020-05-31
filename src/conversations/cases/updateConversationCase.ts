import { IConversationsState, IUpdateConversationAction } from '../types';
import { conversationFactory } from './conversationFactory';

export function updateConversationCase(
  state: IConversationsState,
  { data }: IUpdateConversationAction,
): IConversationsState {
  let conversation = state.conversations.find((c) => c.uid === data.conversationId);
  if (!conversation) conversation = conversationFactory(data.conversationId, data.emitter);
  conversation = {
    ...conversation,
    messages: [...conversation.messages, { ...data }],
    updatedAt: data.createdAt,
  };
  const newState = {
    ...state,
    conversations: [
      ...state.conversations.filter((c) => c.uid !== data.conversationId),
      conversation,
    ]
  };
  newState.conversations.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return newState;
}
