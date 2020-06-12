import { ICallState, IUpdateCallRemoteStreamAction } from '../types';
import { easyId } from '../utils/easyId';

export function updateCallRemoteStreamCase(
  state: ICallState,
  { target, purpose, stream }: IUpdateCallRemoteStreamAction,
): ICallState {
  console.log(`===== updateCallRemoteStreamCase [${purpose}] ${easyId(stream?.id || 'removed')}`);
  return {
    ...state,
    remotes: state.remotes.map((remote) => {
      if (remote.target !== target) return remote;
      return {
        ...remote,
        [purpose === 'call' ? 'stream' : 'screenShare']: stream,
      };
    }),
  };
}
