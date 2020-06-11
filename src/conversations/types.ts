export interface IConversationMessage {
  _id: string;
  conversationId: string;
  createdAt: string;
  emitter: string;
  target: string;
  content: string;
}

export interface IConversation {
  _id: string;
  target: string;
  updatedAt: string;
  unseenMessages: number;
  messages: IConversationMessage[];
}

export type IConversationsStatus = 'unavailable' | 'ready' | 'sending' | 'error';

export interface IConversationsState {
  status: IConversationsStatus;
  messageEdition: string;
  unseenMessages: number;
  conversations: IConversation[];
}

export const CONVERSATIONS_RESET = 'CONVERSATIONS_RESET';
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';
export const ENSURE_CONVERSATION = 'ENSURE_CONVERSATION';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const CONVERSATION_SEEN = 'CONVERSATION_SEEN';
export const UPDATE_CONVERSATION_STATUS = 'UPDATE_CONVERSATION_STATUS';
export const UPDATE_MESSAGE_EDITION = 'UPDATE_MESSAGE_EDITION';

export interface IConversationsResetAction {
  type: typeof CONVERSATIONS_RESET;
}

export interface ICreateConversationAction {
  type: typeof CREATE_CONVERSATION;
  conversationId: string;
  targetId: string;
}

export interface IEnsureConversationAction {
  type: typeof ENSURE_CONVERSATION;
  conversationId: string;
  conversationTarget: string;
  createdAt: string;
}

export interface IUpdateConversationAction {
  type: typeof UPDATE_CONVERSATION;
  conversationId: string;
  conversationTarget: string;
  lastSeen: string | undefined;
  messages: IConversationMessage[];
}

export interface IConversationSeenAction {
  type: typeof CONVERSATION_SEEN;
  id: string;
  seenDate: string;
}

export interface IUpdateConversationStatusAction {
  type: typeof UPDATE_CONVERSATION_STATUS;
  status: IConversationsStatus;
}

export interface IUpdateMessageEditionAction {
  type: typeof UPDATE_MESSAGE_EDITION;
  messageEdition: string;
}

export type IConversationsAction =
  | IConversationsResetAction
  | ICreateConversationAction
  | IEnsureConversationAction
  | IUpdateConversationAction
  | IConversationSeenAction
  | IUpdateConversationStatusAction
  | IUpdateMessageEditionAction;
