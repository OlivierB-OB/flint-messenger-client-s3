import { IConversation } from '../types';

export function consolidateUnseenMessages(conversations: IConversation[]): number {
  return conversations.reduce((res, { unseenMessages }) => res + unseenMessages, 0);
}
