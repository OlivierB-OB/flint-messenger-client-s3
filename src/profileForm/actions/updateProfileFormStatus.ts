import { IProfileFormStatus, IProfileFormAction, UPDATE_PROFILE_FORM_STATUS } from '../types';

export function updateProfileFormStatus(status: IProfileFormStatus): IProfileFormAction {
  return {
    type: UPDATE_PROFILE_FORM_STATUS,
    status,
  };
}
