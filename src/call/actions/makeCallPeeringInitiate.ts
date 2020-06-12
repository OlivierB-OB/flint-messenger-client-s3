import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemote } from './updateCallRemote';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { peerConnexionFactory, bindStreamToPeerConnexion, assertValidConversationId } from '../utils';
import { remotePeerFactory } from '../utils/remotePeerFactory';
import { assertExistingLocalInputs } from '../utils/assertExistingLocalInputs';

export const makeCallPeeringInitiate = action((conversationId: string, target: string, fromStartCall?: boolean) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringInitiate: ${target}`)
    assertValidConversationId(getState(), conversationId);
    const localInputs = assertExistingLocalInputs(getState());

    // Create remote peer connection
    const remote = remotePeerFactory(target);
    remote.peerConnection = peerConnexionFactory(
      (candidate) => dispatch(makeEmit('call-peering-ice-candidate', { conversationId, target, candidate })),
      (stream) => dispatch(updateCallRemoteStream(target, stream)),
    );
    bindStreamToPeerConnexion(remote.peerConnection, localInputs.stream);
    dispatch(updateCallRemote({ ...remote, pendingJoin: fromStartCall }));

    // Emit call request
    dispatch(makeEmit('call-peering-request', { conversationId, target }));
    console.log(`========== END makeCallPeeringInitiate: ${target}`)
  };
});
