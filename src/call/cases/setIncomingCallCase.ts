import { ICallState, ISetIncomingCallAction } from '../types';

export function setIncomingCallCase(state: ICallState, { incomingCall }: ISetIncomingCallAction): ICallState {
  return { ...state, incomingCall };
}
