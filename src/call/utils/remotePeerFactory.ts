import { IRemotePeer } from '../types';

export function remotePeerFactory(target: string): IRemotePeer {
  return { target };
}

export function closeRemotePeer(remote: IRemotePeer): IRemotePeer {
  const { target } = remote;
  closeScreenShare(remote);
  if (remote.peerConnection) remote.peerConnection.close();
  return { target, isDisconnected: true };
}

export function closeScreenShare(remote: IRemotePeer): IRemotePeer {
  if (remote.screenSharePeer) remote.screenSharePeer.close();
  const { target, peerConnection, stream } = remote;
  const newRemote: IRemotePeer = {
    target,
    peerConnection,
    stream,
  };
  return newRemote;
}
