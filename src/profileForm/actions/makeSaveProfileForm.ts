import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { makeResetProfileForm } from './makeResetProfileForm';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { showNavigation } from '../../layout/actions/showNavigation';

export function makeSaveProfileForm() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    const { profileForm } = getState();
    const { lastName, firstName, password } = profileForm.fields;

    // FIXME validate form before sending

    try {
      const data = {
        lastName: lastName.value,
        firstName: firstName.value,
        password: password.value,
      };
      if (!password.value) delete data.password;
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/profile`, data, { withCredentials: true });
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(makeResetProfileForm());
        dispatch(updateProfileFormStatus('success'));
        dispatch(showNavigation());
      });
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
}
