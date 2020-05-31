import { IProfileFormState, IUpdateProfileFormStatusAction } from '../types';
import { deepClone } from '../../utility/deepClone';

export function updateProfileFormStatusCase(
  state: IProfileFormState,
  action: IUpdateProfileFormStatusAction,
): IProfileFormState {
  const newState = deepClone(state);
  newState.status = action.status;
  return newState;
}
