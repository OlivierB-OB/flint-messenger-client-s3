import { ICallState, IUpdateCallRemoteAction } from '../types';

export function updateCallRemoteCase(state: ICallState, { remote }: IUpdateCallRemoteAction): ICallState {
  console.log(`===== updateCallRemoteCase ${remote.target}`);
  return {
    ...state,
    remotes: [
      ...state.remotes.filter(({ target }) => target !== remote.target),
      remote,
    ].filter(({ isDisconnected }) => !isDisconnected),
  };
}
