import { ILoginState, ILoginAction, LOGIN_UPDATE_STATUS, LOGIN_UPDATE_FORM } from './types';
import { loginUpdateFormCase } from './cases/loginUpdateFormCase';
import { updateLoginStatusCase } from './cases/updateLoginStatusCase';

const defaultLogin: ILoginState = {
  status: 'ready',
  form: {
    email: '',
    password: '',
  },
};

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
