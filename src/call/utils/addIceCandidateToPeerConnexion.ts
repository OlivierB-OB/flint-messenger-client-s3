import { displayCandidate } from './displayCandidate';

export async function addIceCandidateToPeerConnexion(
  peerConnection: RTCPeerConnection,
  candidate: RTCIceCandidateInit,
): Promise<void> {
  const { uid } = peerConnection as any;

  const iceCandidate = new RTCIceCandidate(candidate);
  const info = displayCandidate(iceCandidate);

  try {
    await peerConnection.addIceCandidate(iceCandidate);
    console.log(`[${uid}]: IceCandidate added: ${info}`);
  } catch (e) {
    console.warn(`[${uid}]: Fail to add IceCandidate: ${info}`);
    console.warn(e);
  }
}
