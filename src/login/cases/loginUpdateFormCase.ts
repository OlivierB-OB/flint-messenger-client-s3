import { ILoginState, ILoginUpdateFormAction, ILoginForm } from '../types';
import { deepClone } from '../../utility/deepClone';

export function loginUpdateFormCase<T extends keyof ILoginForm>(
  state: ILoginState,
  action: ILoginUpdateFormAction<T>,
): ILoginState {
  const newState = deepClone(state);
  newState.form[action.field] = action.value;
  return newState;
}
