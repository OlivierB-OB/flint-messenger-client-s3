import { IUpdateCallPeerConnectionAction, UPDATE_CALL_PEER_CONNECTION } from '../types';

export function updateCallPeerConnection(peerConnection: RTCPeerConnection): IUpdateCallPeerConnectionAction {
  return {
    type: UPDATE_CALL_PEER_CONNECTION,
    peerConnection,
  };
}
