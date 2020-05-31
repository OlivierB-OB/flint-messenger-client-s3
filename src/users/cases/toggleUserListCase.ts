import { IUsersState, IToggleUserListAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function toggleUserListCase(state: IUsersState, action: IToggleUserListAction): IUsersState {
  const newState = deepClone(state);
  newState.show = action.data;
  return newState;
}
