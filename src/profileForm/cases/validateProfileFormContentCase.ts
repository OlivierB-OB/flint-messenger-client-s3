import { IProfileFormState, IValidateProfileFormContentAction } from '../types';
import { validateNameField, validatePasswordField, validateConfirmationField, validateEmailField } from '../utils';

export function validateProfileFormContentCase(
  state: IProfileFormState,
  action: IValidateProfileFormContentAction,
): IProfileFormState {
  const newState = {
    ...state,
    fields: {
      email: { ...state.fields.email },
      firstName: { ...state.fields.firstName },
      lastName: { ...state.fields.lastName },
      password: { ...state.fields.password },
      confirmation: { ...state.fields.confirmation },
    },
  };
  validateEmailField(newState.fields.email);
  validateNameField(newState.fields.firstName);
  validateNameField(newState.fields.lastName);
  validatePasswordField(newState.fields.password, newState.optionalPassword);
  validateConfirmationField(
    newState.fields.confirmation,
    newState.fields.password,
  );
  return newState;
}
