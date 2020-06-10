import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { history } from '../../history';
import { IAppState } from '../../appReducer';
import { ensureConversation } from '../../conversations/actions/ensureConversation';
import { setIncomingCall } from './setIncomingCall';
import { setCallConversationId } from './setCallConversationId';
import { hideNavigation } from '../../layout/actions/hideNavigation';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { toggleCallAudioInput } from './toggleCallAudioInput';
import { updateCallStatus } from './updateCallStatus';
import { setCallTarget } from './setCallTarget';

export const makeStartCallMode = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    batch(() => {
      dispatch(ensureConversation(conversationId, target, new Date().toISOString()));
      dispatch(setIncomingCall());
      dispatch(setCallConversationId(conversationId));
      dispatch(setCallTarget(target));
      dispatch(hideNavigation());
      dispatch(updateDrawerContent('call'));
      dispatch(toggleCallAudioInput());
      dispatch(updateCallStatus('incall'));
    });
    history.push(`/call`);
  };
});
