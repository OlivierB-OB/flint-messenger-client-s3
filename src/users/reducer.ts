import { IUsersState, IUsersAction, UPDATE_USERS_STATUS, UPDATE_USER_INFO, TOGGLE_USER_LIST } from './types';
import { updateUserInfoCase } from './cases/updateUserInfoCase';
import { toggleUserListCase } from './cases/toggleUserListCase';
import { updateUsersStatusCase } from './cases/updateUsersStatusCase';

const defaultUsersState: IUsersState = {
  status: 'unavailable',
  show: false,
  list: [],
};

export function users(state: IUsersState = defaultUsersState, action: IUsersAction): IUsersState {
  switch (action.type) {
    case UPDATE_USERS_STATUS:
      return updateUsersStatusCase(state, action);
    case UPDATE_USER_INFO:
      return updateUserInfoCase(state, action);
    case TOGGLE_USER_LIST:
      return toggleUserListCase(state, action);
    default:
      return state;
  }
}
