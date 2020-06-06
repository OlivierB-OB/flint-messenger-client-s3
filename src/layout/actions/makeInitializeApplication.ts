import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { IProfile } from '../../identity/types';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';
import { action } from '../../utils/action';
import { showNavigation } from './showNavigation';

export const makeInitializeApplication = action((profile: IProfile) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateIdentity(profile));
    dispatch(makeFetchUsers());
    dispatch(makeFetchConversations());
    dispatch(showNavigation());
  };
});
