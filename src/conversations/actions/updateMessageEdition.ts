import { IUpdateMessageEditionAction, UPDATE_MESSAGE_EDITION } from '../types';

export function updateMessageEdition(text: string): IUpdateMessageEditionAction {
  return {
    type: UPDATE_MESSAGE_EDITION,
    text,
  };
}
