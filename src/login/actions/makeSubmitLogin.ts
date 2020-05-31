import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { makeFetchIdentity } from '../../identity/actions/makeFetchIdentity';
import { updateLoginStatus } from './updateLoginStatus';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeSubmitLogin() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateLoginStatus('unavailable'));

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
