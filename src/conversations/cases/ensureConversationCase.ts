import { IConversationsState, IEnsureConversationAction } from '../types';
import {
  conversationFactory,
  conversationComparator,
} from '../utils';

export function ensureConversationCase(
  state: IConversationsState,
  { conversationId, conversationTarget, createdAt }: IEnsureConversationAction,
): IConversationsState {
  if (state.conversations.some((c) => c._id === conversationId)) return state;
  const conversation = conversationFactory(conversationId, conversationTarget, createdAt);
  const newState = {
    ...state,
    conversations: [...state.conversations.filter((c) => c._id !== conversationId), conversation],
  };
  newState.conversations.sort(conversationComparator);
  return newState;
}
