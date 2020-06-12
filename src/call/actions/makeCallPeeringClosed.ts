import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEndCall } from './makeEndCall';
import { assertValidConversationId, assertExistingRemote, closeScreenShare, closeRemotePeer } from '../utils';
import { updateCallRemote } from './updateCallRemote';
import { IPeeringPurpose } from '../types';

export const makeCallPeeringClosed = action((conversationId: string, target: string, purpose: IPeeringPurpose) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    assertValidConversationId(getState(), conversationId);
    const remote = assertExistingRemote(getState(), target);

    if (purpose === 'call') {
      dispatch(updateCallRemote(closeRemotePeer(remote)));
      if (!getState().call.remotes.length) dispatch(makeEndCall());
    } else {
      dispatch(updateCallRemote(closeScreenShare(remote)));
    }
  };
});
