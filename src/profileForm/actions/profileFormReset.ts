import { IProfileFormResetAction, PROFILE_FORM_RESET } from '../types';

export function profileFormReset(): IProfileFormResetAction {
  return { type: PROFILE_FORM_RESET };
}
