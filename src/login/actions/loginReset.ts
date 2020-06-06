import { ILoginResetAction, LOGIN_RESET } from '../types';

export function loginReset(): ILoginResetAction {
  return { type: LOGIN_RESET };
}
