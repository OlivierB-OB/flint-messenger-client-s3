import { IConversationsState, IUpdateConversationAction } from '../types';
import {
  conversationFactory,
  messageComparator,
  countUnseenMessages,
  conversationComparator,
  consolidateUnseenMessages,
  lastMessageDate,
} from '../utils';

export function updateConversationCase(
  state: IConversationsState,
  { conversationId, conversationTarget, lastSeen, ...data }: IUpdateConversationAction,
): IConversationsState {
  const messages = [...data.messages];
  messages.sort(messageComparator);

  const { createdAt } = messages[messages.length - 1];

  let conversation =
    state.conversations.find((c) => c._id === conversationId) ||
    conversationFactory(conversationId, conversationTarget, createdAt);

  conversation = {
    ...conversation,
    messages: [...conversation.messages, ...messages],
  };
  conversation.messages.sort(messageComparator);
  conversation.updatedAt = lastMessageDate(conversation.messages);
  conversation.unseenMessages = countUnseenMessages(lastSeen, conversation.messages);

  const newState = {
    ...state,
    conversations: [...state.conversations.filter((c) => c._id !== conversationId), conversation],
  };
  newState.conversations.sort(conversationComparator);
  newState.unseenMessages = consolidateUnseenMessages(newState.conversations);
  return newState;
}
