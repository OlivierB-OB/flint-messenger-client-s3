import { IFormField, IPasswordField, IProfileFormState } from '../types';

export function defaultStrField(): IFormField<string> {
  return { value: '', isValid: true };
}

export function defaultPwdField(): IPasswordField {
  return {
    ...defaultStrField(),
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSymbol: false,
    hasValidLength: false,
  };
}

export function defaultProfileFormState(): IProfileFormState {
  return {
    status: 'unavailable',
    fields: {
      email: defaultStrField(),
      firstName: defaultStrField(),
      lastName: defaultStrField(),
      password: defaultPwdField(),
      confirmation: defaultStrField(),
    },
  };
}
