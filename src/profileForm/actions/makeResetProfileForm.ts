import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { resetProfileForm } from './resetProfileForm';

export function makeResetProfileForm() {
  return (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    if (!info) dispatch(updateProfileFormStatus('unavailable'));
    else dispatch(resetProfileForm(info));
  };
}
