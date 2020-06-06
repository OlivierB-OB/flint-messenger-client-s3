import { IUsersResetAction, USERS_RESET } from '../types';

export function usersReset(): IUsersResetAction {
  return { type: USERS_RESET };
}
