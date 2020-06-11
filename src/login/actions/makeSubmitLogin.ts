import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateLoginStatus } from './updateLoginStatus';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { config } from '../../config';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';

const { api_backend_url } = config;

export const makeSubmitLogin = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateLoginStatus('unavailable'));

    const { login } = getState();
    const { email, password } = login.form;

    // FIXME validate form before sending

    try {
      const response = await axios.post(
        `${api_backend_url}/login`,
        {
          username: email.value,
          password: password.value,
        },
        { withCredentials: true },
      );
      await dispatch(makeExitApplication());
      dispatch(makeInitializeApplication(response.data));
      history.push(`/profile`);
    } catch (error) {
      dispatch(updateLoginStatus('error'));
    }
  };
});
