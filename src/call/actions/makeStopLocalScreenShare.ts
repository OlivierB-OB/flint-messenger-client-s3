import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallScreenShareStream } from './updateCallScreenShareStream';
import { closeScreenShare } from '../utils';
import { updateCallRemote } from './updateCallRemote';

export const makeStopLocalScreenShare = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    
    const { screenShare, remotes } = getState().call;

    for (const remote of remotes) {
      dispatch(updateCallRemote(closeScreenShare(remote)));
    }

    if (screenShare) {
      screenShare.close();
    }
    dispatch(updateCallScreenShareStream());
  };
});
