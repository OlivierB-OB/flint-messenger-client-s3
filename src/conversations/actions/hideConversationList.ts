import { IToggleConversationListAction, TOGGLE_CONVERSATION_LIST } from '../types';

export function hideConversationList(): IToggleConversationListAction {
  return {
    type: TOGGLE_CONVERSATION_LIST,
    value: false,
  };
}
