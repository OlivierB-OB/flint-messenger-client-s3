import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { assertValidConversationId, assertExistingPeerConnexion, assertExistingRemote } from '../utils';
import { IPeeringPurpose } from '../types';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { updateCallRemote } from './updateCallRemote';

export const makeCallPeeringFinalized = action(
  (conversationId: string, target: string, purpose: IPeeringPurpose, answer: RTCSessionDescriptionInit) => {
    return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
      console.log(`========== START makeCallPeeringFinalized: ${target} - ${purpose}`);
      assertValidConversationId(getState(), conversationId);
      const peerConnection = assertExistingPeerConnexion(getState(), target, purpose);

      // Accept the received RTC peer connexion answer
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

      console.log(`========== END makeCallPeeringFinalized: ${target} - ${purpose}`);

      const remote = assertExistingRemote(getState(), target);
      if (!remote.pendingJoin) return;
      // The remote just joined the call
      // he might have to create some peering with other attendees

      const requiredPeering = getState()
        .call.remotes.filter(({ pendingJoin }) => !pendingJoin)
        .map(({ target }) => target);

      dispatch(updateCallRemote({ ...remote, pendingJoin: false }));

      if (requiredPeering.length)
        dispatch(makeEmit('call-additional-peering-required', { conversationId, target, purpose, requiredPeering }));
    };
  },
);
