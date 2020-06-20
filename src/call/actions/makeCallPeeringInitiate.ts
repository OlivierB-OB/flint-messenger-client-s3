import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemote } from './updateCallRemote';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import {
  peerConnexionFactory,
  bindStreamToPeerConnexion,
  assertValidConversationId,
  remotePeerFactory,
  assertExistingLocalInputs,
  assertExistingLocalScreenShare,
  assertExistingRemote,
} from '../utils';
import { makeCallPeeringClosed } from './makeCallPeeringClosed';
import { IPeeringPurpose } from '../types';

export const makeCallPeeringInitiate = action(
  (conversationId: string, target: string, purpose: IPeeringPurpose, fromStartCall?: boolean) => {
    return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
      console.log(`========== START makeCallPeeringInitiate: ${target} - ${purpose}`);

      assertValidConversationId(getState(), conversationId);

      // Create (retrieve) remote remote peer
      const remote = purpose === 'call' ? remotePeerFactory(target) : assertExistingRemote(getState(), target);

      // Create peer connection
      const peerConnection = await peerConnexionFactory(
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
        // bind local screen share stream
        const localScreenShare = assertExistingLocalScreenShare(getState());
        bindStreamToPeerConnexion(peerConnection, localScreenShare.stream);
        remote.screenSharePeer = peerConnection;
      }

      dispatch(updateCallRemote({ ...remote, pendingJoin: fromStartCall }));

      // Emit peering request
      dispatch(makeEmit('call-peering-request', { conversationId, target, purpose }));

      console.log(`========== END makeCallPeeringInitiate: ${target} - ${purpose}`);
    };
  },
);
