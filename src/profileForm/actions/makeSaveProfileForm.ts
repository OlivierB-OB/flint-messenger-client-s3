import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { makeResetProfileForm } from './makeResetProfileForm';
import { updateProfileFormStatus } from './updateProfileFormStatus';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeSaveProfileForm() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    // FIXME HTTP call goes here
    await SLEEP(3000);

    const { profileForm, identity } = getState();
    const { info } = identity;
    const { lastName, firstName } = profileForm.fields;
    if (!info) dispatch(updateProfileFormStatus('error'));
    else {
      batch(() => {
        dispatch(
          updateIdentity({
            ...info,
            lastName: lastName.value,
            firstName: firstName.value,
          }),
        );
        dispatch(makeResetProfileForm());
        dispatch(updateProfileFormStatus('success'));
      });
    }
  };
}
