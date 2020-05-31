import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { history } from '../../history';
import { makeResetProfileForm } from './makeResetProfileForm';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeFetchIdentity } from '../../identity/actions/makeFetchIdentity';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeSubmitRegistrationForm() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateProfileFormStatus('unavailable'));

    // FIXME HTTP call goes here
    await SLEEP(3000);

    // const { profileForm, identity } = getState();
    // if (!info) dispatch(updateProfileFormStatus('error'));
    // else {
    dispatch(makeFetchIdentity());
    history.push(`/profile`);
    // }
  };
}
