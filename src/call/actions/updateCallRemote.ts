import { IUpdateCallRemoteAction, UPDATE_CALL_REMOTE, IRemotePeer } from '../types';

export function updateCallRemote(remote: IRemotePeer): IUpdateCallRemoteAction {
  return {
    type: UPDATE_CALL_REMOTE,
    remote,
  };
}
