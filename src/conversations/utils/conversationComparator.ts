import { IConversation } from '../types';

export function conversationComparator(a: IConversation, b: IConversation): number {
  return a.updatedAt < b.updatedAt ? 1 : -1;
}
