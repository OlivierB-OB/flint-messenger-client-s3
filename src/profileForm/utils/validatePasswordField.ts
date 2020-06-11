import { IPasswordField } from '../types';

export function validatePasswordField(password: IPasswordField, isOptional?: boolean): void {
  // FIXME in the case of the regitration the password is required
  password.hasLower = /[a-z]+/.test(password.value);
  password.hasUpper = /[A-Z]+/.test(password.value);
  password.hasNumber = /\d+/.test(password.value);
  password.hasSymbol = /[^a-zA-Z0-9]+/.test(password.value);
  password.hasValidLength = /^.{8,20}$/.test(password.value);
  password.isValid =
    (isOptional && !password.value) ||
    [password.hasLower, password.hasUpper, password.hasNumber, password.hasSymbol, password.hasValidLength].every(
      Boolean,
    );
  if (!password.isValid) password.error = 'must meet the minimum requirements';
  else delete password.error;
}
