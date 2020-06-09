import { ICallState, IUpdateCallScreenShareStreamAction } from '../types';

export function updateCallScreenShareStreamCase(state: ICallState, { stream }: IUpdateCallScreenShareStreamAction): ICallState {
  return { ...state, screenShareStream: stream };
}
