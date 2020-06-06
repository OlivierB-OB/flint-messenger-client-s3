import { IConversationsState } from '../types';

export function defaultConversationsState(): IConversationsState {
  return {
    status: 'unavailable',
    messageEdition: '',
    unseenMessages: 0,
    conversations: [],
  };
}
