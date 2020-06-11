import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { config } from '../../config';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { validateProfileFormContent } from './validateProfileForm';

const { api_backend_url } = config;

export const makeSubmitRegistrationForm = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    try {
      dispatch(validateProfileFormContent());

      const { profileForm } = getState();
      const { email, lastName, firstName, password, confirmation } = profileForm.fields;

      if ([lastName, firstName, password, confirmation].some(({ isValid }) => !isValid)) {
        throw Error('Invalid form content');
      }

      const response = await axios.post(
        `${api_backend_url}/register`,
        {
          email: email.value,
          lastName: lastName.value,
          firstName: firstName.value,
          password: password.value,
        },
        { withCredentials: true },
      );
      await dispatch(makeExitApplication());
      dispatch(makeInitializeApplication(response.data));
      history.push(`/profile`);
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
});
