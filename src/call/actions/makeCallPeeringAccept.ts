import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { updateCallRemote } from './updateCallRemote';
import { makeEmit } from '../../realtime/actions/makeEmit';
import {
  peerConnexionFactory,
  bindStreamToPeerConnexion,
  assertValidConversationId,
  remotePeerFactory,
  assertExistingLocalInputs,
  assertExistingRemote,
} from '../utils';
import { makeCallPeeringClosed } from './makeCallPeeringClosed';
import { IPeeringPurpose } from '../types';

export const makeCallPeeringAccept = action((conversationId: string, target: string, purpose: IPeeringPurpose) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== START makeCallPeeringAccept: ${target} - ${purpose}`);

    assertValidConversationId(getState(), conversationId);

    // Create (retrieve) remote remote peer
    const remote = purpose === 'call' ? remotePeerFactory(target) : assertExistingRemote(getState(), target);

    // Create peer connection
    const peerConnection = peerConnexionFactory(
      (candidate) => dispatch(makeEmit('call-peering-ice-candidate', { conversationId, target, purpose, candidate })),
      () => dispatch(makeCallPeeringClosed(conversationId, target, purpose)),
      (stream) => dispatch(updateCallRemoteStream(target, purpose, stream)),
    );

    if (purpose === 'call') {
      // bind local inputs stream
      const localInputs = assertExistingLocalInputs(getState());
      bindStreamToPeerConnexion(peerConnection, localInputs.stream);
      remote.peerConnection = peerConnection;
    } else {
      // screen sharing is one way noting to bind on this side
      remote.screenSharePeer = peerConnection;
    }

    dispatch(updateCallRemote(remote));

    // Emit peering accepted
    dispatch(makeEmit('call-peering-accepted', { conversationId, target, purpose }));

    console.log(`========== END makeCallPeeringAccept: ${target} - ${purpose}`);
  };
});
