import { IConversationsState, ICreateConversationAction } from '../types';
import { conversationFactory, conversationComparator } from '../utils';

export function createConversationCase(
  state: IConversationsState,
  action: ICreateConversationAction,
): IConversationsState {
  const newState = {
    ...state,
    conversations: [...state.conversations, conversationFactory(action.conversationId, action.targetId)],
  };
  newState.conversations.sort(conversationComparator);
  return newState;
}
