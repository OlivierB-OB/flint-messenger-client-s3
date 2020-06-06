import { IUsersState, IUsersAction, UPDATE_USERS_STATUS, UPDATE_USER_INFO, USERS_RESET } from './types';
import { updateUserInfoCase } from './cases/updateUserInfoCase';
import { updateUsersStatusCase } from './cases/updateUsersStatusCase';
import { defaultUsersState } from './utils/defaultUsersState';

export function users(state: IUsersState = defaultUsersState(), action: IUsersAction): IUsersState {
  switch (action.type) {
    case USERS_RESET:
      return defaultUsersState();
    case UPDATE_USERS_STATUS:
      return updateUsersStatusCase(state, action);
    case UPDATE_USER_INFO:
      return updateUserInfoCase(state, action);
    default:
      return state;
  }
}
