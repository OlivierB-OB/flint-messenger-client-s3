import {
  IConversationsState,
  IConversationsAction,
  CREATE_CONVERSATION,
  UPDATE_CONVERSATION,
  TOGGLE_CONVERSATION_LIST,
  UPDATE_MESSAGE_EDITION,
  UPDATE_CONVERSATION_STATUS,
  CONVERSATION_SEEN,
} from './types';
import { updateConversationCase } from './cases/updateConversationCase';
import { updateConversationStatusCase } from './cases/updateConversationStatusCase';
import { createConversationCase } from './cases/createConversationCase';
import { toggleConversationListCase } from './cases/toggleConversationListCase';
import { updateMessageEditionCase } from './cases/updateMessageEditionCase';
import { conversationSeenCase } from './cases/conversationSeenCase';

const defaultConversationsState: IConversationsState = {
  status: 'unavailable',
  show: false,
  messageEdition: '',
  unseenMessages: 0,
  conversations: [],
};

export function conversations(
  state: IConversationsState = defaultConversationsState,
  action: IConversationsAction,
): IConversationsState {
  switch (action.type) {
    case CREATE_CONVERSATION:
      return createConversationCase(state, action);
    case UPDATE_CONVERSATION:
      return updateConversationCase(state, action);
    case CONVERSATION_SEEN:
      return conversationSeenCase(state, action);
    case UPDATE_CONVERSATION_STATUS:
      return updateConversationStatusCase(state, action);
    case TOGGLE_CONVERSATION_LIST:
      return toggleConversationListCase(state, action);
    case UPDATE_MESSAGE_EDITION:
      return updateMessageEditionCase(state, action);
    default:
      return state;
  }
}
