import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { updateCallRemote } from './updateCallRemote';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { peerConnexionFactory, bindStreamToPeerConnexion, assertValidConversationId } from '../utils';
import { remotePeerFactory } from '../utils/remotePeerFactory';
import { assertExistingLocalInputs } from '../utils/assertExistingLocalInputs';

export const makeCallPeeringCreateOffer = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringCreateOffer: ${target}`)
    assertValidConversationId(getState(), conversationId);
    const localInputs = assertExistingLocalInputs(getState());

    // Create remote peer connection
    const remote = remotePeerFactory(target);
    remote.peerConnection = peerConnexionFactory(
      (candidate) => dispatch(makeEmit('call-peering-ice-candidate', { conversationId, target, candidate })),
      (stream) => dispatch(updateCallRemoteStream(target, stream)),
    );
    bindStreamToPeerConnexion(remote.peerConnection, localInputs.stream);
    dispatch(updateCallRemote(remote));

    // Create an RTC peer connexion offer
    const offer = await remote.peerConnection.createOffer();
    await remote.peerConnection.setLocalDescription(offer);
    dispatch(makeEmit('call-peering-offer', { conversationId, target, offer: remote.peerConnection.localDescription }));
    console.log(`========== END makeCallPeeringCreateOffer: ${target}`)
  };
});
