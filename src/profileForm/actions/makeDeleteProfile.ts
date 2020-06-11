import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeDeleteProfile = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    // FIXME confirm before sending

    dispatch(updateProfileFormStatus('unavailable'));

    try {
      await axios.delete(`${api_backend_url}/profile`, { withCredentials: true });
      dispatch(makeExitApplication());
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
});
