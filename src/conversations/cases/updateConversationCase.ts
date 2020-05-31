import { IConversationsState, IUpdateConversationAction } from '../types';
import { deepClone } from '../../utility/deepClone';
import { conversationFactory } from './conversationFactory';

export function updateConversationCase(
  state: IConversationsState,
  action: IUpdateConversationAction,
): IConversationsState {
  const newState = deepClone(state);
  const message = deepClone(action.data);
  let conversation = newState.conversations.find((c) => c.uid === message.conversationId);
  if (!conversation) conversation = conversationFactory(message.conversationId, message.emitter);
  conversation.messages = [...conversation.messages, message];
  conversation.updatedAt = message.createdAt;
  newState.conversations = [...newState.conversations.filter((c) => c.uid !== message.conversationId), conversation];
  newState.conversations.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return newState;
}
