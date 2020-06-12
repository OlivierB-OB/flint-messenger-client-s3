import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { history } from '../../history';
import { IAppState } from '../../appReducer';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { showNavigation } from '../../layout/actions/showNavigation';
import { makeStopLocalScreenShare } from './makeStopLocalScreenShare';
import { callReset } from './callReset';

export const makeCallModeExit = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { conversationId } = getState().call;
    if (!conversationId) return;
    batch(() => {
      dispatch(updateDrawerContent('conversations'));
      dispatch(showNavigation());
      dispatch(makeStopLocalScreenShare());
      dispatch(callReset());
    });
    history.push(`/conversation/${conversationId}`);
  };
});
