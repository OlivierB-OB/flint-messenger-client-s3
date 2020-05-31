import { ILoginAction, LOGIN_UPDATE_STATUS, ILoginStatus } from '../types';

export function updateLoginStatus(status: ILoginStatus): ILoginAction {
  return {
    type: LOGIN_UPDATE_STATUS,
    status,
  };
}
