import { IConversationsState, ICreateConversationAction } from '../types';
import { deepClone } from '../../utility/deepClone';
import { conversationFactory } from './conversationFactory';
import { history } from '../../history';

export function createConversationCase(
  state: IConversationsState,
  action: ICreateConversationAction,
): IConversationsState {
  const newState = deepClone(state);
  const conversationId = [action.myId, action.targetId, new Date().toISOString()].join('_');
  const newConversation = conversationFactory(conversationId, action.targetId);
  newState.conversations.unshift(newConversation);
  history.push(`/conversation/${conversationId}`);
  return newState;
}
