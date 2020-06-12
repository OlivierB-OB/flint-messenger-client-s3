import { easyId } from './easyId';

export function bindStreamToPeerConnexion(peerConnection: RTCPeerConnection, stream: MediaStream): void {
  const { uid } = peerConnection as any;

  console.log(`[${uid}]: local stream bound: ${easyId(stream.id)}`);
  stream.getTracks().forEach((track) => {
    console.log(`[${uid}]: local track bound: ${easyId(track.id)} [${track.kind}]`);
    peerConnection.addTrack(track, stream);
  });
}
