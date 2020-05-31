import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateIdentity } from './updateIdentity';
import { updateIdentityStatus } from './updateIdentityStatus';
import { defaultIdentity } from '../cases/defaultIdentity';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';
import { history } from '../../history';
import { batch } from 'react-redux';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeFetchIdentity() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateIdentityStatus('unavailable'));

    // FIXME HTTP call goes here
    await SLEEP(3000);
    const { info } = defaultIdentity;

    if (!info) {
      dispatch(updateIdentityStatus('unavailable'));
      history.push(`/login`);
    } else {
      batch(() => {
        dispatch(updateIdentity(info));
        dispatch(makeFetchUsers());
        dispatch(makeFetchConversations());
      });
    }
  };
}
