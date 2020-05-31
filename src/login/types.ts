export type ILoginStatus = 'unavailable' | 'ready' | 'error';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginState {
  status: ILoginStatus;
  form: ILoginForm;
}

export const LOGIN_UPDATE_STATUS = 'LOGIN_UPDATE_STATUS';
export const LOGIN_UPDATE_FORM = 'LOGIN_UPDATE_FORM';
export const LOGIN_AUTHENTICATION = 'LOGIN_AUTHENTICATION';

export interface ILoginUpdateStatusAction {
  type: typeof LOGIN_UPDATE_STATUS;
  status: ILoginStatus;
}

export interface ILoginUpdateFormAction<T extends keyof ILoginForm> {
  type: typeof LOGIN_UPDATE_FORM;
  field: T;
  value: string;
}

export interface ILoginAuthenticationAction {
  type: typeof LOGIN_AUTHENTICATION;
}

export type ILoginAction = ILoginUpdateStatusAction | ILoginAuthenticationAction | ILoginUpdateFormAction<any>;
