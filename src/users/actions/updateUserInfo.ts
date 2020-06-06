import { IUpdateUserInfoAction, UPDATE_USER_INFO, IUserInfo } from '../types';

export function updateUserInfo(info: IUserInfo[]): IUpdateUserInfoAction {
  return {
    type: UPDATE_USER_INFO,
    data: info,
  };
}
