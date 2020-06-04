import { IProfileFormState } from '../types';

const defaultStrField = () => ({ value: '', isValid: true });
const defaultPwdField = () => ({
  ...defaultStrField(),
  hasLower: false,
  hasUpper: false,
  hasNumber: false,
  hasSymbol: false,
  hasValidLength: false,
});

export const defaultProfileForm = (): IProfileFormState => ({
  status: 'unavailable',
  fields: {
    email: defaultStrField(),
    firstName: defaultStrField(),
    lastName: defaultStrField(),
    password: defaultPwdField(),
    confirmation: defaultStrField(),
  },
});
