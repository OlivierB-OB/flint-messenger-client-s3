import { IIdentityState, IUpdateIdentityAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateIdentityCase(state: IIdentityState, action: IUpdateIdentityAction): IIdentityState {
  const newState = deepClone(state);
  newState.info = deepClone(action.info);
  newState.status = 'ready';
  return newState;
}
