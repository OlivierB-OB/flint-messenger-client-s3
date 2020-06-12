import { IConversation } from '../types';

export function conversationFactory(
  _id: string,
  targets: string[],
  updatedAt: string = new Date().toISOString(),
): IConversation {
  return {
    _id,
    targets,
    updatedAt,
    unseenMessages: 0,
    messages: [],
  };
}
