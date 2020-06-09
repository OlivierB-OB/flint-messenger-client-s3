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
  offer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    // FIXME check if conversation exists

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
    peerConnection.ontrack = function ({ streams: [stream] }) {
      console.log('================peerConnection.ontrack')
      dispatch(updateCallRemoteStream(stream));
    };
    const { stream } = localInputs;
    stream.getTracks().forEach(track => {
      console.log('================peerConnection.addTrack')
      peerConnection.addTrack(track, stream)
    });
    dispatch(updateCallPeerConnection(peerConnection));

    // Accept remote offer
    console.log('================peerConnection.setRemoteDescription')
    
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // Answer to received offer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    // FIXME emit call-accepted
    dispatch(makeEmit('call-accepted', { conversationId, target, answer }));
  };
});
