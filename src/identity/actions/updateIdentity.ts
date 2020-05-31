import { IUserInfo } from '../../users/types';
import { UPDATE_IDENTITY, IIdentityAction } from '../types';

export function updateIdentity(info: IUserInfo): IIdentityAction {
  return {
    type: UPDATE_IDENTITY,
    info,
  };
}
