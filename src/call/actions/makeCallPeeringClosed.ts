import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEndCall } from './makeEndCall';
import { assertValidConversationId, assertExistingRemote, closeRemotePeer } from '../utils';
import { updateCallRemote } from './updateCallRemote';

export const makeCallPeeringClosed = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    assertValidConversationId(getState(), conversationId);
    const remote = assertExistingRemote(getState(), target);
    dispatch(updateCallRemote(closeRemotePeer(remote)));

    if (!getState().call.remotes.length) dispatch(makeEndCall());
  };
});
