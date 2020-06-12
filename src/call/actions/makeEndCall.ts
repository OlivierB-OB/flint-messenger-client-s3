import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { updateCallRemote } from './updateCallRemote';
import { closeRemotePeer } from '../utils';
import { makeCallModeExit } from './makeCallModeExit';

export const makeEndCall = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { inputs: localInputs, remotes, conversationId } = getState().call;

    if (localInputs) {
      const { stream } = localInputs;
      stream.getTracks().forEach((track) => track.stop());
    }

    for (const remote of remotes) {
      dispatch(makeEmit('call-left', { target: remote.target, conversationId }));
      dispatch(updateCallRemote(closeRemotePeer(remote)));
    }

    dispatch(makeCallModeExit());
  };
});
