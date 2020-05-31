import { IConversationsState, ICreateConversationAction } from '../types';
import { conversationFactory } from './conversationFactory';
import { history } from '../../history';

export function createConversationCase(
  state: IConversationsState,
  action: ICreateConversationAction,
): IConversationsState {
  const newState = { ...state, conversations: [...state.conversations] };
  const conversationId = [action.myId, action.targetId, new Date().toISOString()].join('_');
  const newConversation = conversationFactory(conversationId, action.targetId);
  newState.conversations.unshift(newConversation);
  history.push(`/conversation/${conversationId}`);
  return newState;
}
