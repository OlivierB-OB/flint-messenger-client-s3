import { IConversationsState, IConversationSeenAction } from '../types';
import { consolidateUnseenMessages } from './utils/consolidateUnseenMessages';
import { conversationComparator } from './utils/conversationComparator';
import { countUnseenMessages } from './utils/countUnseenMessages';

export function conversationSeenCase(
  state: IConversationsState,
  { id, seenDate }: IConversationSeenAction,
): IConversationsState {
  const conversation = state.conversations.find((c) => c._id === id);
  if (!conversation) throw Error('Conversation not found');

  const newConversation = {
    ...conversation,
    unseenMessages: countUnseenMessages(seenDate, conversation.messages),
  };
  const newState = {
    ...state,
    conversations: [...state.conversations.filter((c) => c._id !== id), newConversation],
  };
  newState.conversations.sort(conversationComparator);
  newState.unseenMessages = consolidateUnseenMessages(newState.conversations);
  return newState;
}
