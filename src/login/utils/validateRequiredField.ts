import { IFormField } from '../../profileForm/types';

export function validateRequiredField(field: IFormField<string>): void {
  field.isValid = !!field.value;
  if (!field.isValid) field.error = 'this field is required';
  else delete field.error;
}
