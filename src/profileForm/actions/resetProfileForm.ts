import { IProfile } from '../../identity/types';
import { IProfileFormAction, RESET_PROFILE_FORM } from '../types';

export function resetProfileForm(info?: IProfile): IProfileFormAction {
  return {
    type: RESET_PROFILE_FORM,
    info,
  };
}
