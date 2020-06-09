import { IIncomingCall, ISetIncomingCallAction, SET_INCOMING_CALL } from '../types';

export function setIncomingCall(incomingCall?: IIncomingCall): ISetIncomingCallAction {
  return {
    type: SET_INCOMING_CALL,
    incomingCall,
  };
}
