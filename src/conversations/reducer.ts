import {
  IConversationsState,
  IConversationsAction,
  CREATE_CONVERSATION,
  UPDATE_CONVERSATION,
  UPDATE_MESSAGE_EDITION,
  UPDATE_CONVERSATION_STATUS,
  CONVERSATION_SEEN,
  CONVERSATIONS_RESET,
  ENSURE_CONVERSATION,
  ADD_CONVERSATION_TARGET,
} from './types';
import { updateConversationCase } from './cases/updateConversationCase';
import { updateConversationStatusCase } from './cases/updateConversationStatusCase';
import { createConversationCase } from './cases/createConversationCase';
import { updateMessageEditionCase } from './cases/updateMessageEditionCase';
import { conversationSeenCase } from './cases/conversationSeenCase';
import { defaultConversationsState } from './utils';
import { ensureConversationCase } from './cases/ensureConversationCase';
import { addConversationTargetCase } from './cases/addConversationTargetCase';

export function conversations(
  state: IConversationsState = defaultConversationsState(),
  action: IConversationsAction,
): IConversationsState {
  switch (action.type) {
    case CONVERSATIONS_RESET:
      return defaultConversationsState();
    case CREATE_CONVERSATION:
      return createConversationCase(state, action);
    case ENSURE_CONVERSATION:
      return ensureConversationCase(state, action);
    case UPDATE_CONVERSATION:
      return updateConversationCase(state, action);
    case ADD_CONVERSATION_TARGET:
      return addConversationTargetCase(state, action);
    case CONVERSATION_SEEN:
      return conversationSeenCase(state, action);
    case UPDATE_CONVERSATION_STATUS:
      return updateConversationStatusCase(state, action);
    case UPDATE_MESSAGE_EDITION:
      return updateMessageEditionCase(state, action);
    default:
      return state;
  }
}
