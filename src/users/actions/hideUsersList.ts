import { IToggleUserListAction, TOGGLE_USER_LIST } from '../types';

export function hideUsersList(): IToggleUserListAction {
  return {
    type: TOGGLE_USER_LIST,
    data: false,
  };
}
