import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateUsersStatus } from './updateUsersStatus';
import { updateUserInfo } from './updateUserInfo';

export const makeFetchUsers = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateUsersStatus('unavailable'));

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/users`, { withCredentials: true });
      batch(() => {
        dispatch(updateUsersStatus('ready'));
        dispatch(updateUserInfo(response.data));
      });
    } catch (error) {
      dispatch(updateUsersStatus('unavailable'));
    }
  };
});
