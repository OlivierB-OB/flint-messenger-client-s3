import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallScreenShareStream } from './updateCallScreenShareStream';

export const makeStartLocalScreenShare = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    
    const localScreenShareStream = await (navigator.mediaDevices as any).getDisplayMedia({
      video: {
        cursor: "always"
      },
      audio: false
    });
    dispatch(updateCallScreenShareStream(localScreenShareStream));
  };
});
