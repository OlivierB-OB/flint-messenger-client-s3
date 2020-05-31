import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateUsersStatus } from './updateUsersStatus';
import { defaultUsersState } from '../cases/defaultUsersState';
import { updateUserInfo } from './updateUserInfo';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeFetchUsers() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateUsersStatus('unavailable'));

    // FIXME HTTP call goes here
    await SLEEP(3000);
    const { list } = defaultUsersState;

    if (!list) dispatch(updateUsersStatus('unavailable'));
    else {
      batch(() => {
        dispatch(updateUsersStatus('ready'));
        for (const user of list) dispatch(updateUserInfo(user));
      });
    }
  };
}
