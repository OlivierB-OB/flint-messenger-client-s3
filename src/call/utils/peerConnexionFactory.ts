import axios from 'axios';
import { displayCandidate } from './displayCandidate';
import { easyId } from './easyId';
import { config } from '../../config';

export async function peerConnexionFactory(
  onicecandidate: (candidate: RTCIceCandidate) => void,
  onClosed: () => void,
  onTrack: (stream: MediaStream) => void,
): Promise<RTCPeerConnection> {
  const uid = `RTC-${new Date().getTime()}`;

  // viagenie.ca STUN / TURN provider
  /*
  const { stun_server_url, turn_server_url, stun_turn_user, stun_turn_pass } = config;

  if (!stun_server_url || !turn_server_url) {
    throw Error('Missing STUN/TURN informations');
  }

  const iceServersConfig = {
    iceServers: [
      {
        urls: [stun_server_url, turn_server_url],
        username: stun_turn_user,
        credential: stun_turn_pass
      }
    ],
  };
  */

  // twilio STUN / STURN provider

  const { api_backend_url } = config;
  const response = await axios.get(`${api_backend_url}/webrtc/ice-servers`, { withCredentials: true });
  const iceServersConfig = response.data;

  const peerConnection = new RTCPeerConnection(iceServersConfig);

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
  };

  peerConnection.onicecandidate = (event) => {
    console.log('===================================> ICE CANDIDATE');
    console.log(event);
    if (!event.candidate) return;
    const info = displayCandidate(event.candidate);
    console.log(`[${uid}]: New IceCandidate: ${info}`);
    onicecandidate(event.candidate);
  };

  peerConnection.ontrack = ({ streams: [stream] }) => {
    console.log(`[${uid}]: New Stream: ${easyId(stream.id)}`);
    onTrack(stream);
  };

  return peerConnection;
}
