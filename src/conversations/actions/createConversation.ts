import { ICreateConversationAction, CREATE_CONVERSATION } from '../types';

export function createConversation(myId: string, targetId: string): ICreateConversationAction {
  return {
    type: CREATE_CONVERSATION,
    myId,
    targetId,
  };
}
