import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { assertValidConversationId, assertExistingPeerConnexion } from '../utils';
import { IPeeringPurpose } from '../types';

export const makeCallPeeringCreateOffer = action((conversationId: string, target: string, purpose: IPeeringPurpose) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringCreateOffer: ${target} - ${purpose}`);

    assertValidConversationId(getState(), conversationId);
    const peerConnection = assertExistingPeerConnexion(getState(), target, purpose);

    // Create an RTC peer connexion offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Emit peering offer
    dispatch(
      makeEmit('call-peering-offer', { conversationId, target, purpose, offer: peerConnection.localDescription }),
    );

    console.log(`========== END makeCallPeeringCreateOffer: ${target} - ${purpose}`);
  };
});
