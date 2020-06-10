import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { assertValidConversationId, assertExistingPeerConnexion } from '../utils';

export const makeAcceptedCall = action((
  conversationId: string,
  target: string,
  offer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START ACCEPTED')
    const appState = getState();
    assertValidConversationId(appState, conversationId);
    const peerConnection = assertExistingPeerConnexion(appState, target);

    // Accept the received RTC peer connexion offer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an RTC peer connexion answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    dispatch(makeEmit('call-established', { conversationId, target, answer: peerConnection.localDescription }));
    console.log('======================================== END ACCEPTED')
  };
});
