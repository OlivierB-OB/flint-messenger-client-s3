import { IUsersState, IUpdateUserInfoAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateUserInfoCase(state: IUsersState, action: IUpdateUserInfoAction): IUsersState {
  const newState = deepClone(state);
  newState.list = [...newState.list.filter((user) => user.uid !== action.data.uid), deepClone(action.data)];
  return newState;
}
