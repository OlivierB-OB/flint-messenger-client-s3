import { IUserInfo } from '../users/types';

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

export interface IProfileFormFields {
  email: IFormField<string>;
  firstName: IFormField<string>;
  lastName: IFormField<string>;
  password: IPasswordField;
  confirmation: IFormField<string>;
}

export interface IProfileFormState {
  status: IProfileFormStatus;
  fields: IProfileFormFields;
}

export const UPDATE_PROFILE_FORM = 'UPDATE_PROFILE_FORM';
export const RESET_PROFILE_FORM = 'RESET_PROFILE_FORM';
export const UPDATE_PROFILE_FORM_STATUS = 'UPDATE_PROFILE_FORM_STATUS';

export interface IUpdateProfileFormAction<T extends keyof IProfileFormFields> {
  type: typeof UPDATE_PROFILE_FORM;
  field: T;
  value: IProfileFormFields[T]['value'];
}

export interface IUpdateProfileFormStatusAction {
  type: typeof UPDATE_PROFILE_FORM_STATUS;
  status: IProfileFormStatus;
}

export interface IResetProfileFormAction {
  type: typeof RESET_PROFILE_FORM;
  info?: IUserInfo;
}

export type IProfileFormAction =
  | IUpdateProfileFormAction<any>
  | IUpdateProfileFormStatusAction
  | IResetProfileFormAction;
