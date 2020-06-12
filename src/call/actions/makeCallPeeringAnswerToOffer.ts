import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { assertValidConversationId, assertExistingPeerConnexion } from '../utils';
import { IPeeringPurpose } from '../types';

export const makeCallPeeringAnswerToOffer = action((
  conversationId: string,
  target: string,
  purpose: IPeeringPurpose,
  offer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringAnswerToOffer: ${target} - ${purpose}`)

    assertValidConversationId(getState(), conversationId);
    const peerConnection = assertExistingPeerConnexion(getState(), target, purpose);

    // Accept the received RTC peer connexion offer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an RTC peer connexion answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Emit peering answer
    dispatch(makeEmit('call-peering-answer', { conversationId, target, purpose, answer: peerConnection.localDescription }));

    console.log(`========== END makeCallPeeringAnswerToOffer: ${target} - ${purpose}`)
  };
});
