import { IUpdateCallScreenShareStreamAction, UPDATE_CALL_SCREEN_SHARE_STREAM } from '../types';

export function updateCallScreenShareStream(stream?: MediaStream): IUpdateCallScreenShareStreamAction {
  return {
    type: UPDATE_CALL_SCREEN_SHARE_STREAM,
    stream,
  };
}
