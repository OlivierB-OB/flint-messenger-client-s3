import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateProfileFormStatus } from './updateProfileFormStatus';

export function makeDeleteProfile() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    
    // FIXME confirm before sending

    dispatch(updateProfileFormStatus('unavailable'));

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/profile`, { withCredentials: true });
      history.push(`/login`);
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
}
