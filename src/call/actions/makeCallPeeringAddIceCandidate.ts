import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { addIceCandidateToPeerConnexion, assertValidConversationId, assertExistingPeerConnexion } from '../utils';

export const makeCallPeeringAddIceCandidate = action((
  conversationId: string,
  target: string,
  candidate: RTCIceCandidateInit,
) => {
  return async (_: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    assertValidConversationId(getState(), conversationId);
    const peerConnection = assertExistingPeerConnexion(getState(), target);
    
    // Add the received RTC ice candaidate
    await addIceCandidateToPeerConnexion(peerConnection, candidate);
  };
});
