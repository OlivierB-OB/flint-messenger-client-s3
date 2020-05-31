import { IConversationsState, IToggleConversationListAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function toggleConversationListCase(
  state: IConversationsState,
  action: IToggleConversationListAction,
): IConversationsState {
  const newState = deepClone(state);
  newState.show = action.value;
  return newState;
}
