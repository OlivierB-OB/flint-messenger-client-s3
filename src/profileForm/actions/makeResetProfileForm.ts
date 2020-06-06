import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { resetProfileFormContent } from './resetProfileFormContent';

export const makeResetProfileForm = action(() => {
  return (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    dispatch(resetProfileFormContent(info));
  };
});
