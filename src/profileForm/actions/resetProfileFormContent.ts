import { IProfile } from '../../identity/types';
import { IProfileFormAction, RESET_PROFILE_FORM_CONTENT } from '../types';

export function resetProfileFormContent(info?: IProfile): IProfileFormAction {
  return {
    type: RESET_PROFILE_FORM_CONTENT,
    info,
  };
}
