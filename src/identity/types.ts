import { IUserInfo } from '../users/types';

export type IIdentityStatus = 'unavailable' | 'ready';

export interface IIdentityState {
  status: IIdentityStatus;
  info?: IUserInfo;
}

export const UPDATE_IDENTITY = 'UPDATE_IDENTITY';
export const UPDATE_IDENTITY_STATUS = 'UPDATE_IDENTITY_STATUS';

export interface IUpdateIdentityAction {
  type: typeof UPDATE_IDENTITY;
  info: IUserInfo;
}

export interface IUpdateIdentityStatusAction {
  type: typeof UPDATE_IDENTITY_STATUS;
  status: IIdentityStatus;
}

export type IIdentityAction = IUpdateIdentityAction | IUpdateIdentityStatusAction;
