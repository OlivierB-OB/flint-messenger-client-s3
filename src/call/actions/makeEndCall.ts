import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { history } from '../../history';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeStopLocalScreenShare } from './makeStopLocalScreenShare';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { callReset } from './callReset';
import { showNavigation } from '../../layout/actions/showNavigation';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { updateCallRemote } from './updateCallRemote';
import { closeRemotePeer } from '../utils/remotePeerFactory';

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

    if (!conversationId) return;

    dispatch(updateDrawerContent('conversations'));
    dispatch(showNavigation());
    dispatch(makeStopLocalScreenShare());
    dispatch(callReset());
    
    history.push(`/conversation/${conversationId}`);
  };
});
