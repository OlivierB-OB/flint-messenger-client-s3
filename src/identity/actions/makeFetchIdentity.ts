import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateIdentityStatus } from './updateIdentityStatus';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';

export const makeFetchIdentity = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateIdentityStatus('unavailable'));

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/profile`, { withCredentials: true });
      dispatch(makeInitializeApplication(response.data));
    } catch (error) {
      dispatch(makeExitApplication());
    }
  };
});
