import { IFormField } from '../profileForm/types';

export type ILoginStatus = 'unavailable' | 'ready' | 'error';

export interface ILoginForm {
  email: IFormField<string>;
  password: IFormField<string>;
}

export interface ILoginState {
  status: ILoginStatus;
  form: ILoginForm;
}

export const LOGIN_RESET = 'LOGIN_RESET';
export const LOGIN_UPDATE_STATUS = 'LOGIN_UPDATE_STATUS';
export const LOGIN_UPDATE_FORM = 'LOGIN_UPDATE_FORM';
export const LOGIN_VALIDATE_FORM = 'LOGIN_VALIDATE_FORM';
export const LOGIN_AUTHENTICATION = 'LOGIN_AUTHENTICATION';

export interface ILoginResetAction {
  type: typeof LOGIN_RESET;
}

export interface ILoginUpdateStatusAction {
  type: typeof LOGIN_UPDATE_STATUS;
  status: ILoginStatus;
}

export interface ILoginUpdateFormAction<T extends keyof ILoginForm> {
  type: typeof LOGIN_UPDATE_FORM;
  field: T;
  value: string;
}

export interface ILoginValidateFormAction {
  type: typeof LOGIN_VALIDATE_FORM;
}

export interface ILoginAuthenticationAction {
  type: typeof LOGIN_AUTHENTICATION;
}

export type ILoginAction =
  | ILoginResetAction
  | ILoginUpdateStatusAction
  | ILoginAuthenticationAction
  | ILoginValidateFormAction
  | ILoginUpdateFormAction<any>;
