import { IUpdateMessageEditionAction, UPDATE_MESSAGE_EDITION } from '../types';

export function updateMessageEdition(messageEdition: string): IUpdateMessageEditionAction {
  return {
    type: UPDATE_MESSAGE_EDITION,
    messageEdition,
  };
}
