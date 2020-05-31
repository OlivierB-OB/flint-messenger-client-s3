import { IConversationsState, IUpdateConversationStatusAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateConversationStatusCase(
  state: IConversationsState,
  action: IUpdateConversationStatusAction,
): IConversationsState {
  const newState = deepClone(state);
  newState.status = action.status;
  return newState;
}
