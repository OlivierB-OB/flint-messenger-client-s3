import { IIdentityState, IUpdateIdentityAction } from '../types';

export function updateIdentityCase(state: IIdentityState, { info }: IUpdateIdentityAction): IIdentityState {
  return { ...state, status: 'ready', info: { ...info } };
}
