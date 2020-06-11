import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateUsersStatus } from './updateUsersStatus';
import { updateUserInfo } from './updateUserInfo';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeFetchUsers = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateUsersStatus('unavailable'));

    try {
      const response = await axios.get(`${api_backend_url}/users`, { withCredentials: true });
      batch(() => {
        dispatch(updateUsersStatus('ready'));
        dispatch(updateUserInfo(response.data));
      });
    } catch (error) {
      dispatch(updateUsersStatus('unavailable'));
    }
  };
});
