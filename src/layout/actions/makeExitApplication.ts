import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { action } from '../../utils/action';
import { history } from '../../history';
import { updateIdentityStatus } from '../../identity/actions/updateIdentityStatus';

export const makeExitApplication = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateIdentityStatus('unavailable')); // FIXME
    history.push(`/login`);
  };
});
