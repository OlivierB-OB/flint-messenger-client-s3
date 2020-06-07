import { ILoginState, ILoginUpdateFormAction, ILoginForm } from '../types';
import { validateRequiredField } from '../utils';

export function loginUpdateFormCase<T extends keyof ILoginForm>(
  state: ILoginState,
  { field, value }: ILoginUpdateFormAction<T>,
): ILoginState {
  const newState = {
    ...state,
    form: {
      ...state.form,
      [field]: {
        ...state.form[field],
        value,
      },
    },
  };
  const formField = newState.form[field];
  validateRequiredField(formField);
  return newState;
}
