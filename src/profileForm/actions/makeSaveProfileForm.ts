import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { config } from '../../config';
import { validateProfileFormContent } from './validateProfileForm';

const { api_backend_url } = config;

export const makeSaveProfileForm = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    try {
      dispatch(validateProfileFormContent());

      const { profileForm } = getState();
      const { lastName, firstName, password, confirmation } = profileForm.fields;

      if ([lastName, firstName, password, confirmation].some(({ isValid }) => !isValid)) {
        throw Error('Invalid form content');
      }

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
