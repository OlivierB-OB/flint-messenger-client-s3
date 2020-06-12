import { IConversationsState, ICreateConversationAction } from '../types';
import { conversationFactory, conversationComparator } from '../utils';

export function createConversationCase(
  state: IConversationsState,
  { conversationId, targets }: ICreateConversationAction,
): IConversationsState {
  const newState = {
    ...state,
    conversations: [...state.conversations, conversationFactory(conversationId, targets)],
  };
  newState.conversations.sort(conversationComparator);
  return newState;
}
