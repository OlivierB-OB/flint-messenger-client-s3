import { IUpdateCallRemoteStreamAction, UPDATE_CALL_REMOTE_STREAM, IPeeringPurpose } from '../types';

export function updateCallRemoteStream(
  target: string,
  purpose: IPeeringPurpose,
  stream?: MediaStream,
): IUpdateCallRemoteStreamAction {
  return {
    type: UPDATE_CALL_REMOTE_STREAM,
    target,
    purpose,
    stream,
  };
}
