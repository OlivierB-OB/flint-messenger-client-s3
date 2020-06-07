import { ILoginState } from '../types';
import { defaultStrField } from '../../profileForm/utils';

export function defaultLoginState(): ILoginState {
  return {
    status: 'ready',
    form: {
      email: defaultStrField(),
      password: defaultStrField(),
    },
  };
}
