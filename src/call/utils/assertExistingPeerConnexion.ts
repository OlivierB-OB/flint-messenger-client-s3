import { IAppState } from '../../appReducer';
import { assertExistingRemote } from './assertExistingRemote';
import { IPeeringPurpose } from '../types';

export function assertExistingPeerConnexion(
  appState: IAppState,
  target: string,
  purpose: IPeeringPurpose,
): RTCPeerConnection {
  const remote = assertExistingRemote(appState, target);
  if (purpose === 'call') {
    if (!remote.peerConnection) throw Error('No peer connexion available');
    return remote.peerConnection;
  } else {
    if (!remote.screenSharePeer) throw Error('No peer connexion available');
    return remote.screenSharePeer;
  }
}
