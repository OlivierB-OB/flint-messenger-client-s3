import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { resetProfileForm } from './resetProfileForm';

export const makeResetProfileForm = action(() => {
  return (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    if (!info) dispatch(updateProfileFormStatus('unavailable'));
    else dispatch(resetProfileForm(info));
  };
});
