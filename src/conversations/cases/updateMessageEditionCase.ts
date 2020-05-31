import { IUpdateMessageEditionAction, IConversationsState } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateMessageEditionCase(
  state: IConversationsState,
  action: IUpdateMessageEditionAction,
): IConversationsState {
  const newState = deepClone(state);
  newState.messageEdition = action.text;
  return newState;
}
