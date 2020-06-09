import { ICallState, IUpdateCallRemoteStreamAction } from '../types';

export function updateCallRemoteStreamCase(state: ICallState, { stream }: IUpdateCallRemoteStreamAction): ICallState {
  return { ...state, remoteStream: stream };
}
