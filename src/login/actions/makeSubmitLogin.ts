import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateLoginStatus } from './updateLoginStatus';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeSubmitLogin = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateLoginStatus('unavailable'));

    const { login } = getState();
    const { email, password } = login.form;

    // FIXME validate form before sending

    try {
      console.log('=======================================APP EXIT');
      console.log('=======================================SEND CREDENTIALS');
      const response = await axios.post(
        `${api_backend_url}/login`,
        {
          username: email.value,
          password: password.value,
        },
        { withCredentials: true },
      );
      console.log('=======================================IN');
      dispatch(makeInitializeApplication(response.data));
      console.log('=======================================STARTED');
      history.push(`/profile`);
    } catch (error) {
      dispatch(updateLoginStatus('error'));
    }
  };
});
