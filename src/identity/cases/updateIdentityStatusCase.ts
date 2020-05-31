import { IIdentityState, IUpdateIdentityStatusAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateIdentityStatusCase(state: IIdentityState, action: IUpdateIdentityStatusAction): IIdentityState {
  const newState = deepClone(state);
  newState.status = deepClone(action.status);
  delete newState.info;
  return newState;
}
