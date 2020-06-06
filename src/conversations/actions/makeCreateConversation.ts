import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { history } from '../../history';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { forgeNewConversationId } from '../utils';
import { createConversation } from './createConversation';

export const makeCreateConversation = action((target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    if (!info) throw Error('profile unavailable');

    const conversationId = forgeNewConversationId(info._id, target);
    dispatch(updateDrawerContent('conversations'));
    dispatch(createConversation(conversationId, target));
    history.push(`/conversation/${conversationId}`);
  };
});
