import { ILoginState, ILoginUpdateStatusAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateLoginStatusCase(state: ILoginState, action: ILoginUpdateStatusAction): ILoginState {
  const newState = deepClone(state);
  newState.status = action.status;
  return newState;
}
