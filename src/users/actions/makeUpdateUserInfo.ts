import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { IUserInfo } from '../types';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { updateUserInfo } from './updateUserInfo';

export const makeUpdateUserInfo = action((infos: IUserInfo[]) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const myId = getState().identity.info?._id;
    const myInfo = infos.find(({ _id }) => _id === myId);
    if (myInfo) dispatch(updateIdentity(myInfo));
    dispatch(updateUserInfo(infos.filter(({ _id }) => _id !== myId)));
  };
});
