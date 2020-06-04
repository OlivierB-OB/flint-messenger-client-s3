import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateLoginStatus } from './updateLoginStatus';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';
import { showNavigation } from '../../layout/actions/showNavigation';

export function makeSubmitLogin() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateLoginStatus('unavailable'));

    const { login } = getState();
    const { email, password } = login.form;
    
    // FIXME validate form before sending

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/login`, {
        username: email,
        password,
      }, { withCredentials: true });
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(makeFetchUsers());
        dispatch(makeFetchConversations());
        dispatch(showNavigation());
      });
      history.push(`/profile`);
    } catch (error) {
      dispatch(updateLoginStatus('error'));
    }
  };
}
