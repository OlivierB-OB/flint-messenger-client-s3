import { IUserInfo } from '../../users/types';
import { IProfileFormAction, RESET_PROFILE_FORM } from '../types';

export function resetProfileForm(info?: IUserInfo): IProfileFormAction {
  return {
    type: RESET_PROFILE_FORM,
    info,
  };
}
