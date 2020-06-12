import { ICallState } from '../types';

export function defaultCallState(): ICallState {
  return {
    status: 'unavailable',
    remotes: [],
  };
}
