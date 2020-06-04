import { IConversation } from '../types';

export function conversationFactory(_id: string, target: string, updatedAt: string = new Date().toISOString()): IConversation {
  return {
    _id,
    target,
    updatedAt,
    unseenMessages: 0,
    messages: [],
  };
}
