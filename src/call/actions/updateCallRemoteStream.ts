import { IUpdateCallRemoteStreamAction, UPDATE_CALL_REMOTE_STREAM } from '../types';

export function updateCallRemoteStream(target: string, stream?: MediaStream): IUpdateCallRemoteStreamAction {
  return {
    type: UPDATE_CALL_REMOTE_STREAM,
    target,
    stream,
  };
}
