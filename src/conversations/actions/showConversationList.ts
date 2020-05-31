import { IToggleConversationListAction, TOGGLE_CONVERSATION_LIST } from '../types';

export function showConversationList(): IToggleConversationListAction {
  return {
    type: TOGGLE_CONVERSATION_LIST,
    value: true,
  };
}
