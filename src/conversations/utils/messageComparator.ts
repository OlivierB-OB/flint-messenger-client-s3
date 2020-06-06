import { IConversationMessage } from '../types';

export function messageComparator(a: IConversationMessage, b: IConversationMessage): number {
  return a.createdAt < b.createdAt ? -1 : 1;
}
