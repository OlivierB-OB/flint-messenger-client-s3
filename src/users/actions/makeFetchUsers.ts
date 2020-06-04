import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateUsersStatus } from './updateUsersStatus';
import { updateUserInfo } from './updateUserInfo';

export function makeFetchUsers() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateUsersStatus('unavailable'));

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/users`, { withCredentials: true });
      batch(() => {
        dispatch(updateUsersStatus('ready'));
        for (const user of response.data) dispatch(updateUserInfo(user));
      });
    } catch (error) {
      dispatch(updateUsersStatus('unavailable'));
    }
  };
}
