import { ICallState, IUpdateCallScreenShareStreamAction } from '../types';

export function updateCallScreenShareStreamCase(state: ICallState, { screenShare }: IUpdateCallScreenShareStreamAction): ICallState {
  return { ...state, screenShare };
}
