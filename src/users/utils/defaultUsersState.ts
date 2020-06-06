import { IUsersState } from '../types';

export function defaultUsersState(): IUsersState {
  return {
    status: 'unavailable',
    list: [],
  };
}
