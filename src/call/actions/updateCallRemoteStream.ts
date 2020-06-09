import { IUpdateCallRemoteStreamAction, UPDATE_CALL_REMOTE_STREAM } from '../types';

export function updateCallRemoteStream(stream?: MediaStream): IUpdateCallRemoteStreamAction {
  return {
    type: UPDATE_CALL_REMOTE_STREAM,
    stream,
  };
}
