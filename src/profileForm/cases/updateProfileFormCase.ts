import { IProfileFormFields, IProfileFormState, IUpdateProfileFormAction } from '../types';
import { validateNameField, validatePasswordField, validateConfirmationField, validateEmailField } from '../utils';

export function updateProfileFormCase<T extends keyof IProfileFormFields>(
  state: IProfileFormState,
  { field, value }: IUpdateProfileFormAction<T>,
): IProfileFormState {
  const newState = {
    ...state,
    fields: {
      ...state.fields,
      [field]: {
        ...state.fields[field],
        value,
      },
    },
  };
  if (field === 'email') {
    const { email } = newState.fields;
    validateEmailField(email);
  } else if (['firstName', 'lastName'].includes(field)) {
    const formField = newState.fields[field];
    validateNameField(formField);
  } else if (field === 'password') {
    const { password } = newState.fields;
    validatePasswordField(password);
  }
  if (['password', 'confirmation'].includes(field)) {
    const { password, confirmation } = newState.fields;
    validateConfirmationField(confirmation, password);
  }
  return newState;
}
