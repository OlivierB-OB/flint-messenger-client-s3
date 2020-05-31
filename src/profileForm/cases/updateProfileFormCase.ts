import { IProfileFormFields, IProfileFormState, IUpdateProfileFormAction, IFormField, IPasswordField } from '../types';
import { deepClone } from '../../utility/deepClone';

function validateNameField(field: IFormField<string>): void {
  field.isValid = /^[a-zA-Z]{1,20}$/.test(field.value);
  if (!field.isValid) field.error = 'expecting 1..30 characters in a..z';
  else delete field.error;
}

function validatePasswordField(password: IPasswordField): void {
  password.hasLower = /[a-z]+/.test(password.value);
  password.hasUpper = /[A-Z]+/.test(password.value);
  password.hasNumber = /\d+/.test(password.value);
  password.hasSymbol = /[^a-zA-Z0-9]+/.test(password.value);
  password.hasValidLength = /^.{8,20}$/.test(password.value);
  password.isValid =
    !password.value ||
    [password.hasLower, password.hasUpper, password.hasNumber, password.hasSymbol, password.hasValidLength].every(
      Boolean,
    );
  if (!password.isValid) password.error = 'must meet the minimum requirements';
  else delete password.error;
}

function validateConfirmationField(confirmation: IFormField<string>, password: IPasswordField): void {
  confirmation.isValid = password.value === confirmation.value;
  if (!confirmation.isValid) confirmation.error = 'must meet the minimum requirements';
  else delete confirmation.error;
}

export function updateProfileFormCase<T extends keyof IProfileFormFields>(
  state: IProfileFormState,
  action: IUpdateProfileFormAction<T>,
): IProfileFormState {
  const newState = deepClone(state);
  newState.fields[action.field].value = action.value;
  if (['firstName', 'lastName'].includes(action.field)) {
    const field = newState.fields[action.field];
    validateNameField(field);
  } else if (action.field === 'password') {
    const { password } = newState.fields;
    validatePasswordField(password);
  }
  if (action.field === 'password' || action.field === 'confirmation') {
    const { password, confirmation } = newState.fields;
    validateConfirmationField(confirmation, password);
  }
  return newState;
}
