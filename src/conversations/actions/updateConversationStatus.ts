import { IUpdateConversationStatusAction, UPDATE_CONVERSATION_STATUS, IConversationsStatus } from '../types';

export function updateConversationStatus(status: IConversationsStatus): IUpdateConversationStatusAction {
  return {
    type: UPDATE_CONVERSATION_STATUS,
    status,
  };
}
