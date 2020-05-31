import { ILoginState } from '../types';

// FIXME
export const defaultLogin: ILoginState = {
  status: 'ready',
  form: {
    email: '',
    password: '',
  },
};
