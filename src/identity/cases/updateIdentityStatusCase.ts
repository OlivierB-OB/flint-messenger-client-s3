import { IIdentityState, IUpdateIdentityStatusAction } from '../types';

export function updateIdentityStatusCase(
  state: IIdentityState,
  { status }: IUpdateIdentityStatusAction,
): IIdentityState {
  const newState = { ...state, status };
  delete newState.info;
  return newState;
}
