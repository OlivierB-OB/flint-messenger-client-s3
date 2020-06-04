export type IUserStatus = 'available' | 'incall' | 'offline';

export interface IUserInfo {
  _id: string;
  lastName: string;
  firstName: string;
  status: IUserStatus;
  updatedAt: string;
}

export type IUsersStateStatus = 'unavailable' | 'ready';

export interface IUsersState {
  status: IUsersStateStatus;
  show: boolean;
  list: IUserInfo[];
}

export const UPDATE_USERS_STATUS = 'UPDATE_USERS_STATUS';
export const TOGGLE_USER_LIST = 'TOGGLE_USER_LIST';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export interface IUpdateUsersStatusAction {
  type: typeof UPDATE_USERS_STATUS;
  status: IUsersStateStatus;
}

export interface IToggleUserListAction {
  type: typeof TOGGLE_USER_LIST;
  data: boolean;
}

export interface IUpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO;
  data: IUserInfo;
}

export type IUsersAction = IUpdateUsersStatusAction | IToggleUserListAction | IUpdateUserInfoAction;
