import { IUsersState, IUpdateUsersStatusAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateUsersStatusCase(state: IUsersState, action: IUpdateUsersStatusAction): IUsersState {
  const newState = deepClone(state);
  newState.status = action.status;
  return newState;
}
