import { IAppState } from '../../appReducer';
import { assertExistingRemote } from './assertExistingRemote';

export function assertExistingPeerConnexion(appState: IAppState, target: string): RTCPeerConnection {
  const remote = assertExistingRemote(appState, target);
  if (!remote.peerConnection) throw Error('No peer connexion available');
  return remote.peerConnection;
}
