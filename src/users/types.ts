import { IProfile } from '../identity/types';

export type IUsersStateStatus = 'unavailable' | 'ready';

export type IUserInfo = Pick<IProfile, '_id' | 'lastName' | 'firstName' | 'status' | 'updatedAt'>;

export interface IUsersState {
  status: IUsersStateStatus;
  list: IUserInfo[];
}

export const UPDATE_USERS_STATUS = 'UPDATE_USERS_STATUS';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export interface IUpdateUsersStatusAction {
  type: typeof UPDATE_USERS_STATUS;
  status: IUsersStateStatus;
}

export interface IUpdateUserInfoAction {
  type: typeof UPDATE_USER_INFO;
  data: IUserInfo[];
}

export type IUsersAction = IUpdateUsersStatusAction | IUpdateUserInfoAction;
