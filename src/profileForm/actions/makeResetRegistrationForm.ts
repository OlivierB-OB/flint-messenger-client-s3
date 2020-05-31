import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { resetProfileForm } from './resetProfileForm';

export function makeResetRegistrationForm() {
  return (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(resetProfileForm());
  };
}
