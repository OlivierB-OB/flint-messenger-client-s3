import { IFormField } from '../types';

export function validateEmailField(field: IFormField<string>): void {
  field.isValid = /^[a-z0-9-.]+@[a-z0-9-.]+\.[a-z]+$/gi.test(field.value);
  if (!field.isValid) field.error = 'expecting a valid email address';
  else delete field.error;
}
