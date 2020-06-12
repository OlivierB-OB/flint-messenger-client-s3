import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { assertValidConversationId, assertExistingPeerConnexion } from '../utils';
import { makeCallPeeringInitiate } from './makeCallPeeringInitiate';

export const makeCallPeeringFinalized = action((
  conversationId: string,
  target: string,
  answer: RTCSessionDescriptionInit,
  requiredPeering: string[],
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START ESTABLISHED')
    assertValidConversationId(getState(), conversationId);
    const peerConnection = assertExistingPeerConnexion(getState(), target);

    // Accept the received RTC peer connexion answer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('======================================== END ESTABLISHED')

    requiredPeering.forEach((required) => dispatch(makeCallPeeringInitiate(conversationId, required, false)));
  };
});
