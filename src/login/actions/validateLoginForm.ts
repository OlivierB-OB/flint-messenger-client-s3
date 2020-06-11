import { ILoginAction, LOGIN_VALIDATE_FORM } from '../types';

export function validateLoginForm(): ILoginAction {
  return {
    type: LOGIN_VALIDATE_FORM,
  };
}
