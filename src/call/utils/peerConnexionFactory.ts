import { displayCandidate } from './displayCandidate';
import { easyId } from './easyId';

export function peerConnexionFactory(
  onicecandidate: (candidate: RTCIceCandidate) => void,
  onTrack: (stream: MediaStream) => void,
): RTCPeerConnection {
  const uid = `RTC-${new Date().getTime()}`;
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302"
      }
    ]
  });
  (peerConnection as any).uid = uid;

  peerConnection.oniceconnectionstatechange = (evt) => {
    console.log(`[${uid}]: IceConnexion state: ${peerConnection.iceConnectionState}`);
  };

  peerConnection.onicegatheringstatechange = (evt) => {
    console.log(`[${uid}]: IceGathering state: ${peerConnection.iceGatheringState}`);
  };

  peerConnection.onconnectionstatechange = (evt) => {
    console.log(`[${uid}]: PeerConnection state: ${peerConnection.connectionState}`);
  }
  
  peerConnection.onicecandidate = function (event) {
    if (!event.candidate) return;
    const info = displayCandidate(event.candidate)
    console.log(`[${uid}]: New IceCandidate: ${info}`);
    onicecandidate(event.candidate);
  };
  
  peerConnection.ontrack = function ({ streams: [stream] }) {
    console.log(`[${uid}]: New Stream: ${easyId(stream.id)}`);
    onTrack(stream);
  };

  return peerConnection;
}
