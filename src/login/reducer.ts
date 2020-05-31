import { ILoginState, ILoginAction, LOGIN_UPDATE_STATUS, LOGIN_UPDATE_FORM } from './types';
import { defaultLogin } from './cases/defaultLogin';
import { loginUpdateFormCase } from './cases/loginUpdateFormCase';
import { updateLoginStatusCase } from './cases/updateLoginStatusCase';

export function login(state: ILoginState = defaultLogin, action: ILoginAction): ILoginState {
  switch (action.type) {
    case LOGIN_UPDATE_STATUS:
      return updateLoginStatusCase(state, action);
    case LOGIN_UPDATE_FORM:
      return loginUpdateFormCase(state, action);
    default:
      return state;
  }
}
