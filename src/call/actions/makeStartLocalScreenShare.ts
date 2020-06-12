import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallScreenShareStream } from './updateCallScreenShareStream';
import { getLocalScreenShare } from '../utils/getLocalScreenShare';
import { makeCallPeeringInitiate } from './makeCallPeeringInitiate';

export const makeStartLocalScreenShare = action((
  conversationId: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    const localScreenShare = await getLocalScreenShare();
    dispatch(updateCallScreenShareStream(localScreenShare));

    // Initial call peerings
    for (const { target } of getState().call.remotes) {
      dispatch(makeCallPeeringInitiate(conversationId, target, 'screenShare', false));
    }
  };
});
