import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { history } from '../../history';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallStatus } from './updateCallStatus';
import { setCallConversationId } from './setCallConversationId';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { hideNavigation } from '../../layout/actions/hideNavigation';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { toggleCallAudioInput } from './toggleCallAudioInput';
import { updateCallPeerConnection } from './updateCallPeerConnection';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { setCallTarget } from './setCallTarget';
import { updateCallRemoteStream } from './updateCallRemoteStream';

export const makeStartCall = action((conversationId: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    const conversation = getState().conversations.conversations.find(({ _id }) => _id === conversationId);
    if (!conversation) throw Error('Conversation not found');

    const { target } = conversation;

    dispatch(setCallConversationId(conversationId));
    dispatch(setCallTarget(target));
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
    peerConnection.ontrack = function ({ streams }) {
      console.log('================peerConnection.ontrack')
      console.log(`Strem length ${streams.length}`)
      dispatch(updateCallRemoteStream(streams[0]));
    };
    const { stream } = localInputs;
    stream.getTracks().forEach(track => {
      console.log('================peerConnection.addTrack')
      peerConnection.addTrack(track, stream)
    });
    dispatch(updateCallPeerConnection(peerConnection));

    // Create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    // FIXME emit call-request
    dispatch(makeEmit('call-request', { conversationId, target, offer }));
  };
});
