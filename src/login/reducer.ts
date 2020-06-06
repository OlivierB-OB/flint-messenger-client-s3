import { ILoginState, ILoginAction, LOGIN_UPDATE_STATUS, LOGIN_UPDATE_FORM, LOGIN_RESET } from './types';
import { loginUpdateFormCase } from './cases/loginUpdateFormCase';
import { updateLoginStatusCase } from './cases/updateLoginStatusCase';
import { defaultLoginState } from './utils';

export function login(state: ILoginState = defaultLoginState(), action: ILoginAction): ILoginState {
  switch (action.type) {
    case LOGIN_RESET:
      return defaultLoginState();
    case LOGIN_UPDATE_STATUS:
      return updateLoginStatusCase(state, action);
    case LOGIN_UPDATE_FORM:
      return loginUpdateFormCase(state, action);
    default:
      return state;
  }
}
