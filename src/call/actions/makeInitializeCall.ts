import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallStatus } from './updateCallStatus';

export const makeInitializeCall = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateCallStatus('unavailable'));

    try {
      
      // FIXME


      dispatch(updateCallStatus('ready'));
    } catch (error) {
      dispatch(updateCallStatus('unavailable'));
    }
  };
});
