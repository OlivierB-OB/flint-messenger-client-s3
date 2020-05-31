import { IConversationsState } from '../types';

// FIXME
export const defaultConversationsState: IConversationsState = {
  status: 'ready',
  show: false,
  messageEdition: '',
  unseenMessages: 0,
  conversations: [],
};
