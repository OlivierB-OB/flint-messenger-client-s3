import { IAppState } from '../../appReducer';

export function assertExistingPeerConnexion(appState: IAppState, target: string): RTCPeerConnection {
  const { peerConnection } = appState.call;
  if (!peerConnection) throw Error('No peer connexion available');
  return peerConnection;
}
