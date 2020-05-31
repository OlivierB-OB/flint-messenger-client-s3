import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateConversation } from './updateConversation';
import { updateMessageEdition } from './updateMessageEdition';
import { updateConversationStatus } from './updateConversationStatus';

const SLEEP = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export function makeSendMessage(conversationId: string) {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { conversations, identity } = getState();
    const { messageEdition } = conversations;

    if (!messageEdition) return; // abort

    const createdAt = new Date().toISOString();

    batch(() => {
      dispatch(updateMessageEdition(''));
      dispatch(updateConversationStatus('sending'));
    });

    const { info } = identity;
    if (!info) return dispatch(updateConversationStatus('error'));

    // FIXME HTTP call goes here
    await SLEEP(500);

    batch(() => {
      dispatch(
        updateConversation({
          conversationId,
          createdAt,
          emitter: info.uid,
          content: messageEdition,
        }),
      );
      dispatch(updateConversationStatus('ready'));
    });
  };
}
