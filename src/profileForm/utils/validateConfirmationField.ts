import { IFormField, IPasswordField } from '../types';

export function validateConfirmationField(confirmation: IFormField<string>, password: IPasswordField): void {
  confirmation.isValid = password.value === confirmation.value;
  if (!confirmation.isValid) confirmation.error = 'password confirmation does not match';
  else delete confirmation.error;
}
