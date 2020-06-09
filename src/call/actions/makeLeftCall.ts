import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { makeEndCall } from './makeEndCall';

export const makeLeftCall = action((
  conversationId: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    // FIXME check conversation id

    dispatch(makeEndCall());
  };
});
