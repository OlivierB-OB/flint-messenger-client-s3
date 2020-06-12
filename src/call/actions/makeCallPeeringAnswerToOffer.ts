import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { assertValidConversationId, assertExistingPeerConnexion } from '../utils';
import { updateCallRemote } from './updateCallRemote';
import { assertExistingRemote } from '../utils/assertExistingRemote';

export const makeCallPeeringAnswerToOffer = action((
  conversationId: string,
  target: string,
  offer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringAnswerToOffer: ${target}`)
    assertValidConversationId(getState(), conversationId);
    const peerConnection = assertExistingPeerConnexion(getState(), target);

    // Accept the received RTC peer connexion offer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an RTC peer connexion answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    let requiredPeering: string[] = [];
    const remote = assertExistingRemote(getState(), target);
    console.log(remote);
    if (remote.pendingJoin) {
      requiredPeering = getState().call.remotes
        .filter(({ pendingJoin }) => !pendingJoin)
        .map(({ target }) => target);
      dispatch(updateCallRemote({ ...remote, pendingJoin: false }));
    }
    console.log(remote);
    dispatch(makeEmit('call-peering-answer', { conversationId, target, answer: peerConnection.localDescription, requiredPeering }));
    console.log(`========== END makeCallPeeringAnswerToOffer: ${target}`)
  };
});
