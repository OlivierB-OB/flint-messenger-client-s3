import { UPDATE_PROFILE_FORM, IProfileFormFields, IProfileFormAction } from '../types';

export function updateProfileForm<T extends keyof IProfileFormFields>(
  field: T,
  value: IProfileFormFields[T]['value'],
): IProfileFormAction {
  return {
    type: UPDATE_PROFILE_FORM,
    field,
    value,
  };
}
