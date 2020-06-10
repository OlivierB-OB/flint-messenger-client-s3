import { displayCandidate } from './displayCandidate';
import { easyId } from './easyId';

export function peerConnexionFactory(
  onicecandidate: (candidate: RTCIceCandidate) => void,
  onTrack: (stream: MediaStream) => void,
): RTCPeerConnection {
  const uid = `RTC-${new Date().getTime()}`;

  if (!process.env.REACT_APP_STUN_SERVER || !process.env.REACT_APP_TURN_SERVER) {
    throw Error('Missing STUN/TURN informations');
  }

  const peerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: [
        process.env.REACT_APP_STUN_SERVER,
        process.env.REACT_APP_TURN_SERVER,
      ],
        username: process.env.REACT_APP_STUN_TURN_USER,
        credential: process.env.REACT_APP_STUN_TURN_PASS,
    },
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
