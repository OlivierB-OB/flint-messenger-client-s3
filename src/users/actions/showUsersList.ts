import { IToggleUserListAction, TOGGLE_USER_LIST } from '../types';

export function showUsersList(): IToggleUserListAction {
  return {
    type: TOGGLE_USER_LIST,
    data: true,
  };
}
