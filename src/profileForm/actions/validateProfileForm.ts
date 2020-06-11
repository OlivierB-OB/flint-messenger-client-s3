import { IProfileFormAction, VALIDATE_PROFILE_FORM_CONTENT } from '../types';

export function validateProfileFormContent(): IProfileFormAction {
  return {
    type: VALIDATE_PROFILE_FORM_CONTENT,
  };
}
