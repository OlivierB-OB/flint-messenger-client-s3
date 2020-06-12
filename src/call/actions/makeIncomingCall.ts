import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { makeAcceptCall } from './makeAcceptCall';
import { callReset } from './callReset';
import { setIncomingCall } from './setIncomingCall';
import { setCallConversationId } from './setCallConversationId';
import { IPeeringPurpose } from '../types';
import { makeCallPeeringAccept } from './makeCallPeeringAccept';

export const makeIncomingCall = action((
  conversationId: string,
  target: string,
  purpose: IPeeringPurpose,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    const callConversationId = getState().call.conversationId;
    if (callConversationId) {
      // already in call
      if (callConversationId !== conversationId) {
        // different call => reject
        dispatch(makeEmit('call-left', { target, conversationId }));
        return;
      }
      else {
        // same call => accept silently by creating a peering offer
        dispatch(makeCallPeeringAccept(conversationId, target, purpose))
        return;
      }
    }

    dispatch(setCallConversationId(conversationId));
    dispatch(setIncomingCall({
      target,
      accept: () => dispatch(makeAcceptCall(conversationId, target)),
      reject: () => {
        dispatch(callReset());
        dispatch(makeEmit('call-left', { target, conversationId }));
      },
    }));
  }
});
