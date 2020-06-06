import { IIdentityState } from '../types';

export function defaultIdentityState(): IIdentityState {
  return { status: 'unavailable' };
}
