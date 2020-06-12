import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallScreenShareStream } from './updateCallScreenShareStream';

export const makeStopLocalScreenShare = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { screenShare } = getState().call;
    if (screenShare) screenShare.close()
    dispatch(updateCallScreenShareStream());
  };
});
