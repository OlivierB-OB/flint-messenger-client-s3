import { Action } from 'redux';
import { batch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { callReset } from '../../call/actions/callReset';
import { conversationsReset } from '../../conversations/actions/conversationsReset';
import { identityReset } from '../../identity/actions/identityReset';
import { layoutReset } from './layoutReset';
import { loginReset } from '../../login/actions/loginReset';
import { profileFormReset } from '../../profileForm/actions/profileFormReset';
import { realtimeReset } from '../../realtime/actions/realtimeReset';
import { usersReset } from '../../users/actions/usersReset';

export const makeExitApplication = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    console.log('======================= EXIT APP');
    batch(() => {
      dispatch(callReset());
      dispatch(conversationsReset());
      dispatch(identityReset());
      dispatch(layoutReset());
      dispatch(loginReset());
      dispatch(profileFormReset());
      dispatch(realtimeReset());
      dispatch(usersReset());
    });
    history.push(`/login`);
  };
});
