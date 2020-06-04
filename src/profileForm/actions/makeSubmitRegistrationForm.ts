import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';

export function makeSubmitRegistrationForm() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    const { profileForm } = getState();
    const { email, lastName, firstName, password } = profileForm.fields;

    // FIXME validate form before sending

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/register`, {
        email: email.value,
        lastName: lastName.value,
        firstName: firstName.value,
        password: password.value,
      }, { withCredentials: true });
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(makeFetchUsers());
        dispatch(makeFetchConversations());
      });
      history.push(`/profile`);
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
}
