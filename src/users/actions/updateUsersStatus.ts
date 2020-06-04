import { IUpdateUsersStatusAction, UPDATE_USERS_STATUS, IUsersStateStatus } from '../types';

export function updateUsersStatus(status: IUsersStateStatus): IUpdateUsersStatusAction {
  return {
    type: UPDATE_USERS_STATUS,
    status,
  };
}
