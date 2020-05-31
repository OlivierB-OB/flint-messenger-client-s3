import { ILoginForm, ILoginAction, LOGIN_UPDATE_FORM } from '../types';

export function loginUpdateForm<T extends keyof ILoginForm>(field: T, value: string): ILoginAction {
  return {
    type: LOGIN_UPDATE_FORM,
    field,
    value,
  };
}
