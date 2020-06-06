import { IUsersState, IUsersAction, UPDATE_USERS_STATUS, UPDATE_USER_INFO } from './types';
import { updateUserInfoCase } from './cases/updateUserInfoCase';
import { updateUsersStatusCase } from './cases/updateUsersStatusCase';

const defaultUsersState: IUsersState = {
  status: 'unavailable',
  list: [],
};

export function users(state: IUsersState = defaultUsersState, action: IUsersAction): IUsersState {
  switch (action.type) {
    case UPDATE_USERS_STATUS:
      return updateUsersStatusCase(state, action);
    case UPDATE_USER_INFO:
      return updateUserInfoCase(state, action);
    default:
      return state;
  }
}
