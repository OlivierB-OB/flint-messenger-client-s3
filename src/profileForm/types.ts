import { IProfile } from '../identity/types';

export interface IFormField<T> {
  value: T;
  isValid: boolean;
  error?: string;
}

export interface IPasswordField extends IFormField<string> {
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasValidLength: boolean;
}

export type IProfileFormStatus = 'unavailable' | 'ready' | 'success' | 'error';

// FIXME support profile picture

export interface IProfileFormFields {
  email: IFormField<string>;
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  password: IPasswordField;
  confirmation: IFormField<string>;
}

export interface IProfileFormState {
  status: IProfileFormStatus;
  optionalPassword?: boolean;
  fields: IProfileFormFields;
}

export const PROFILE_FORM_RESET = 'PROFILE_FORM_RESET';
export const UPDATE_PROFILE_FORM = 'UPDATE_PROFILE_FORM';
export const RESET_PROFILE_FORM_CONTENT = 'RESET_PROFILE_FORM_CONTENT';
export const VALIDATE_PROFILE_FORM_CONTENT = 'VALIDATE_PROFILE_FORM_CONTENT';
export const UPDATE_PROFILE_FORM_STATUS = 'UPDATE_PROFILE_FORM_STATUS';

export interface IProfileFormResetAction {
  type: typeof PROFILE_FORM_RESET;
}

export interface IUpdateProfileFormAction<T extends keyof IProfileFormFields> {
  type: typeof UPDATE_PROFILE_FORM;
  field: T;
  value: IProfileFormFields[T]['value'];
}

export interface IUpdateProfileFormStatusAction {
  type: typeof UPDATE_PROFILE_FORM_STATUS;
  status: IProfileFormStatus;
}

export interface IValidateProfileFormContentAction {
  type: typeof VALIDATE_PROFILE_FORM_CONTENT;
}

export interface IResetProfileFormContentAction {
  type: typeof RESET_PROFILE_FORM_CONTENT;
  info?: IProfile;
}

export type IProfileFormAction =
  | IProfileFormResetAction
  | IUpdateProfileFormAction<any>
  | IUpdateProfileFormStatusAction
  | IValidateProfileFormContentAction
  | IResetProfileFormContentAction;
