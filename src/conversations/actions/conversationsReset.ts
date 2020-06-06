import { IConversationsResetAction, CONVERSATIONS_RESET } from '../types';

export function conversationsReset(): IConversationsResetAction {
  return { type: CONVERSATIONS_RESET };
}
