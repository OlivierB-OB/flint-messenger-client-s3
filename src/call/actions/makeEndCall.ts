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

export const makeEndCall = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { localInputs, target, peerConnection, conversationId } = getState().call;

    if (localInputs) {
      const { stream } = localInputs;
      stream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
    // FIXME move to close...
    // peerConnection.close();

    if (!conversationId) return;

    dispatch(updateDrawerContent('conversations'));
    dispatch(showNavigation());
    dispatch(makeStopLocalScreenShare());
    dispatch(callReset());
    // FIXME emit call left...
    dispatch(makeEmit('call-left', { target, conversationId }));
    history.push(`/conversation/${conversationId}`);
  };
});
