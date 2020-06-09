import { ICallState, IUpdateCallPeerConnectionAction } from '../types';

export function updateCallPeerConnectionCase(state: ICallState, { peerConnection }: IUpdateCallPeerConnectionAction): ICallState {
  return { ...state, peerConnection };
}
