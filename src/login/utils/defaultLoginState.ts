import { ILoginState } from '../types';

export function defaultLoginState(): ILoginState {
  return {
    status: 'ready',
    form: {
      email: '',
      password: '',
    },
  };
}
