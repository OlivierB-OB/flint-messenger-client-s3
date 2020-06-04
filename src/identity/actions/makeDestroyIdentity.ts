import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateIdentity } from './updateIdentity';
import { updateIdentityStatus } from './updateIdentityStatus';
import { makeFetchUsers } from '../../users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../conversations/actions/makeFetchConversations';
import axios from 'axios';
import { batch } from 'react-redux';
import { history } from '../../history';

export function makeDestroyIdentity() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateIdentityStatus('unavailable'));

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/profile`, { withCredentials: true });
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(makeFetchUsers());
        dispatch(makeFetchConversations());
      });
    } catch (error) {
      dispatch(updateIdentityStatus('unavailable'));
      history.push(`/login`);
      window.location.reload();
    }
  };
}
