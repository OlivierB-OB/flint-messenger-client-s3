import { IConversation } from '../types';

export function conversationFactory(uid: string, target: string): IConversation {
  return {
    uid,
    target,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    unseenMessages: 0,
    messages: [],
  };
}
