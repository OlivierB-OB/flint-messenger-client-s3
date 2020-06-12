import { displayCandidate } from './displayCandidate';
import { easyId } from './easyId';
import { config } from '../../config';

export function peerConnexionFactory(
  onicecandidate: (candidate: RTCIceCandidate) => void,
  onClosed: () => void,
  onTrack: (stream: MediaStream) => void,
): RTCPeerConnection {
  const uid = `RTC-${new Date().getTime()}`;

  const {
    stun_server_url,
    turn_server_url,
    stun_turn_user,
    stun_turn_pass,
  } = config;

  if (!stun_server_url || !turn_server_url) {
    throw Error('Missing STUN/TURN informations');
  }

  const peerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: [
        stun_server_url,
        turn_server_url,
      ],
        username: stun_turn_user,
        credential: stun_turn_pass,
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
    const shouldClose = ['disconnected', 'failed', 'closed'];
    if (shouldClose.includes(peerConnection.connectionState)) onClosed();
  }
  
  peerConnection.onicecandidate = (event) => {
    console.log('===================================> ICE CANDIDATE')
    console.log(event)
    if (!event.candidate) return;
    const info = displayCandidate(event.candidate)
    console.log(`[${uid}]: New IceCandidate: ${info}`);
    onicecandidate(event.candidate);
  };
  
  peerConnection.ontrack = ({ streams: [stream] }) => {
    console.log(`[${uid}]: New Stream: ${easyId(stream.id)}`);
    onTrack(stream);
  };

  return peerConnection;
}
