import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { history } from '../../history';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallStatus } from './updateCallStatus';
import { setCallConversationId } from './setCallConversationId';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { hideNavigation } from '../../layout/actions/hideNavigation';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { toggleCallAudioInput } from './toggleCallAudioInput';
import { updateCallPeerConnection } from './updateCallPeerConnection';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { setIncomingCall } from './setIncomingCall';

export const makeAcceptCall = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    // FIXME check if conversation exists

    console.log('======================================== START ACCEPT')

    dispatch(setIncomingCall());

    dispatch(setCallConversationId(conversationId));
    dispatch(hideNavigation());
    dispatch(updateDrawerContent('call'));
    dispatch(toggleCallAudioInput());
    dispatch(updateCallStatus('incall'));
    history.push(`/call`);

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));

    // Create peer connection
    const peerConnection = new RTCPeerConnection();
    dispatch(updateCallPeerConnection(peerConnection));

    peerConnection.oniceconnectionstatechange = (evt) => {
      console.log(`ICE CONNECTION state: ${peerConnection.iceConnectionState}`);
      console.log('ICE CONNECTION state change event: ', evt);
    };

    peerConnection.onicegatheringstatechange = (evt) => {
      console.log(`ICE GATHERING state: ${peerConnection.iceGatheringState}`);
      console.log('ICE GATHERING state change event: ', evt);
    };

    peerConnection.onconnectionstatechange = (evt) => {
      console.log(`PEER CONNECTION state: ${peerConnection.connectionState}`);
      console.log('PEER CONNECTION state change event: ', evt);
    }

    peerConnection.onicecandidate = function (event) {
      if (event.candidate) {
        console.log('======================================== emiit call-ice-candidate')
        dispatch(makeEmit('call-ice-candidate', { conversationId, target, candidate: event.candidate }));
      }
    };

    peerConnection.ontrack = function ({ streams: [stream] }) {
      console.log('================peerConnection.ontrack')
      dispatch(updateCallRemoteStream(stream));
    };
    const { stream } = localInputs;
    stream.getTracks().forEach(track => {
      console.log('================peerConnection.addTrack')
      peerConnection.addTrack(track, stream)
    });

    // Create offer
    const offer = await peerConnection.createOffer();
    // await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    await peerConnection.setLocalDescription(offer);

    // FIXME emit call-accepted
    console.log('======================================== emiit call-accepted')
    dispatch(makeEmit('call-accepted', { conversationId, target, offer: peerConnection.localDescription }));

    console.log(peerConnection.connectionState);

    console.log('======================================== END ACCEPT')
  };
});
