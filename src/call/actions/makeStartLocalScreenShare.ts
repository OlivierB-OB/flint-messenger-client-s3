import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallScreenShareStream } from './updateCallScreenShareStream';
import { getLocalScreenShare } from '../utils/getLocalScreenShare';

export const makeStartLocalScreenShare = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    // FIXME check if not already started
    
    const localScreenShare = await getLocalScreenShare();
    dispatch(updateCallScreenShareStream(localScreenShare));
  };
});
