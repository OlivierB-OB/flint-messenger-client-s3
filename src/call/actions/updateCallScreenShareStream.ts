import { IUpdateCallScreenShareStreamAction, UPDATE_CALL_SCREEN_SHARE_STREAM, ILocalScreenShare } from '../types';

export function updateCallScreenShareStream(screenShare?: ILocalScreenShare): IUpdateCallScreenShareStreamAction {
  return {
    type: UPDATE_CALL_SCREEN_SHARE_STREAM,
    screenShare,
  };
}
