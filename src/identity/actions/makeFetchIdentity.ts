import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateIdentityStatus } from './updateIdentityStatus';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeFetchIdentity = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateIdentityStatus('unavailable'));

    try {
      const response = await axios.get(`${api_backend_url}/profile`, { withCredentials: true });
      dispatch(makeInitializeApplication(response.data));
    } catch (error) {
      dispatch(makeExitApplication());
    }
  };
});
