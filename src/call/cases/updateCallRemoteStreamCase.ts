import { ICallState, IUpdateCallRemoteStreamAction } from '../types';
import { easyId } from '../utils/easyId';

export function updateCallRemoteStreamCase(state: ICallState, { target, stream }: IUpdateCallRemoteStreamAction): ICallState {
  console.log(`===== updateCallRemoteStreamCase ${easyId(stream?.id || 'removed')}`);
  return {
    ...state,
    remotes: state.remotes.map((remote) => {
      if (remote.target !== target) return remote;
      return { ...remote, stream };
    }),
  };
}
