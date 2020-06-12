import { IConversationsState, IUpdateConversationAction, IConversation } from '../types';
import {
  messageComparator,
  countUnseenMessages,
  conversationComparator,
  consolidateUnseenMessages,
  lastMessageDate,
} from '../utils';

export function updateConversationCase(
  state: IConversationsState,
  { conversationId, targets, lastSeen, ...data }: IUpdateConversationAction,
): IConversationsState {
  const messages = [...data.messages];
  messages.sort(messageComparator);

  let conversation = state.conversations.find((c) => c._id === conversationId) as IConversation;

  conversation = {
    ...conversation,
    messages: [...conversation.messages, ...messages],
  };
  conversation.targets = [...new Set([...conversation.targets, ...targets])];
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
