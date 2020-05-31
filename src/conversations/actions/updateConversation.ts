import { IConversationMessage, IUpdateConversationAction, UPDATE_CONVERSATION } from '../types';

export function updateConversation(message: IConversationMessage): IUpdateConversationAction {
  return {
    type: UPDATE_CONVERSATION,
    data: message,
  };
}
