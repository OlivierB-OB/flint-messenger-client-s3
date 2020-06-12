import { ICallState, IUpdateCallRemoteStreamAction } from '../types';

export function updateCallRemoteStreamCase(state: ICallState, { target, stream }: IUpdateCallRemoteStreamAction): ICallState {
  console.log('======================================================= updateCallRemoteStreamCase ===================');
  console.log('======================================================= updateCallRemoteStreamCase');
  console.log('======================================================= updateCallRemoteStreamCase');
  console.log('======================================================= updateCallRemoteStreamCase');
  return {
    ...state,
    remotes: state.remotes.map((remote) => {
      if (remote.target !== target) return remote;
      return { ...remote, stream };
    }),
  };
}
