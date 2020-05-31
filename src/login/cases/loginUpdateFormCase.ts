import { ILoginState, ILoginUpdateFormAction, ILoginForm } from '../types';

export function loginUpdateFormCase<T extends keyof ILoginForm>(
  state: ILoginState,
  { field, value }: ILoginUpdateFormAction<T>,
): ILoginState {
  return { ...state, form: { ...state.form, [field]: value } };
}
