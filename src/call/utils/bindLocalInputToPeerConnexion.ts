import { ILocalInputs } from '../types';
import { easyId } from './easyId';

export function bindLocalInputToPeerConnexion(
  peerConnection: RTCPeerConnection,
  localInputs: ILocalInputs,
): void {
  const { uid } = (peerConnection as any);
  const { stream } = localInputs;

  console.log(`[${uid}]: local stream bound: ${easyId(stream.id)}`);
  stream.getTracks().forEach(track => {
    console.log(`[${uid}]: local track bound: ${easyId(track.id)} [${track.kind}]`);
    peerConnection.addTrack(track, stream);
  });
}
