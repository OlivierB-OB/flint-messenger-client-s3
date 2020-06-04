import {
  IProfileFormState,
  IProfileFormAction,
  UPDATE_PROFILE_FORM,
  RESET_PROFILE_FORM,
  UPDATE_PROFILE_FORM_STATUS,
} from './types';
import { defaultProfileForm } from './cases/defaultProfileForm';
import { updateProfileFormCase } from './cases/updateProfileFormCase';
import { resetProfileFormCase } from './cases/resetProfileFormCase';
import { updateProfileFormStatusCase } from './cases/updateProfileFormStatusCase';

export function profileForm(
  state: IProfileFormState = defaultProfileForm(),
  action: IProfileFormAction,
): IProfileFormState {
  switch (action.type) {
    case UPDATE_PROFILE_FORM:
      return updateProfileFormCase(state, action);
    case UPDATE_PROFILE_FORM_STATUS:
      return updateProfileFormStatusCase(state, action);
    case RESET_PROFILE_FORM:
      return resetProfileFormCase(state, action);
    default:
      return state;
  }
}
