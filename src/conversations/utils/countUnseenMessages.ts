import { IConversationMessage } from '../types';

export function countUnseenMessages(lastSeen: string | undefined, messages: IConversationMessage[]): number {
  if (!lastSeen) return messages.length;
  return messages.filter(({ createdAt }) => createdAt > lastSeen).length;
}
