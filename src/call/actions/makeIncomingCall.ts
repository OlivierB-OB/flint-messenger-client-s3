import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { makeAcceptCall } from './makeAcceptCall';
import { callReset } from './callReset';
import { setIncomingCall } from './setIncomingCall';
import { setCallConversationId } from './setCallConversationId';

export const makeIncomingCall = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    const callConversationId = getState().call.conversationId;
    if (callConversationId) {
      // already in call => reject
      dispatch(makeEmit('call-left', { target, conversationId }));
      return;
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
