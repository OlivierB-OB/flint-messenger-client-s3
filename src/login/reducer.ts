import { ILoginState, ILoginAction, LOGIN_UPDATE_STATUS, LOGIN_UPDATE_FORM, LOGIN_RESET, LOGIN_VALIDATE_FORM } from './types';
import { loginUpdateFormCase } from './cases/loginUpdateFormCase';
import { updateLoginStatusCase } from './cases/updateLoginStatusCase';
import { defaultLoginState } from './utils';
import { loginValidateFormCase } from './cases/loginValidateFormCase';

export function login(state: ILoginState = defaultLoginState(), action: ILoginAction): ILoginState {
  switch (action.type) {
    case LOGIN_RESET:
      return defaultLoginState();
    case LOGIN_UPDATE_STATUS:
      return updateLoginStatusCase(state, action);
    case LOGIN_UPDATE_FORM:
      return loginUpdateFormCase(state, action);
    case LOGIN_VALIDATE_FORM:
      return loginValidateFormCase(state, action);
    default:
      return state;
  }
}
