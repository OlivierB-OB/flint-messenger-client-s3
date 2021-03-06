import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';

export const makeSubmitRegistrationForm = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    const { profileForm } = getState();
    const { email, lastName, firstName, password } = profileForm.fields;

    // FIXME validate form before sending

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/register`,
        {
          email: email.value,
          lastName: lastName.value,
          firstName: firstName.value,
          password: password.value,
        },
        { withCredentials: true },
      );
      dispatch(makeInitializeApplication(response.data));
      history.push(`/profile`);
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
});
