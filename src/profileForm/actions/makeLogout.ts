import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeLogout = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateProfileFormStatus('unavailable'));

    try {
      await axios.post(`${api_backend_url}/logout`, { withCredentials: true });
      dispatch(makeExitApplication());
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
});
