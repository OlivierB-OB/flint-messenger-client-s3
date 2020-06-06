import { IConversationMessage } from '../types';

export function lastMessageDate(messages: IConversationMessage[]): string {
  return messages[messages.length - 1].createdAt;
}
