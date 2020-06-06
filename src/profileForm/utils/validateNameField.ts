import { IFormField } from '../types';

export function validateNameField(field: IFormField<string>): void {
  field.isValid = /^[a-zA-Z]{1,20}$/.test(field.value);
  if (!field.isValid) field.error = 'expecting 1..20 characters in a..z';
  else delete field.error;
}
