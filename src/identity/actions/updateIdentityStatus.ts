import { IIdentityAction, IIdentityStatus, UPDATE_IDENTITY_STATUS } from '../types';

export function updateIdentityStatus(status: IIdentityStatus): IIdentityAction {
  return {
    type: UPDATE_IDENTITY_STATUS,
    status,
  };
}
