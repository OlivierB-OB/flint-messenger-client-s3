import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeSaveProfileForm = action(() => {
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
      const response = await axios.patch(`${api_backend_url}/profile`, data, { withCredentials: true });
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(updateProfileFormStatus('success'));
      });
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
});
