import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateConversationStatus } from './updateConversationStatus';
import { defaultConversationsState } from '../cases/defaultConversationsState';
import { updateConversation } from './updateConversation';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeFetchConversations() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateConversationStatus('unavailable'));

    // FIXME HTTP call goes here
    await SLEEP(3000);
    const { conversations } = defaultConversationsState;
    const messages = conversations.map((c) => c.messages).flat();

    if (!messages) dispatch(updateConversationStatus('unavailable'));
    else {
      batch(() => {
        dispatch(updateConversationStatus('ready'));
        for (const message of messages) dispatch(updateConversation(message));
      });
    }
  };
}
