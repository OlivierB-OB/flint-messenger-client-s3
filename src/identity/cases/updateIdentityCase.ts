import { IIdentityState, IUpdateIdentityAction, IProfile } from '../types';

export function updateIdentityCase(state: IIdentityState, { info }: IUpdateIdentityAction): IIdentityState {
  const newInfo = { ...(state.info || {}), ...info } as IProfile;
  return { ...state, status: 'ready', info: newInfo };
}
