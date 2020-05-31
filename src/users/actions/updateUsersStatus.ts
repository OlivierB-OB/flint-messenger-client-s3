import { IUpdateUsersStatusAction, IUsersStateStatus, UPDATE_USERS_STATUS } from '../types';

export function updateUsersStatus(status: IUsersStateStatus): IUpdateUsersStatusAction {
  return {
    type: UPDATE_USERS_STATUS,
    status,
  };
}
