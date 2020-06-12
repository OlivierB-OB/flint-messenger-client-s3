import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { IConversationMessage } from '../types';
import { updateConversation } from './updateConversation';
import { ensureConversation } from './ensureConversation';

export const makeUpdateConversation = action((messages: IConversationMessage[]) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    if (!info) throw Error('profile unavailable');

    const batches = messages.reduce<{ [converstionId: string]: IConversationMessage[] }>(
      (res, message) => ({
        ...res,
        [message.conversationId]: [...(res[message.conversationId] || []), message],
      }),
      {},
    );

    batch(() => {
      for (const conversationId in batches) {
        const messages = batches[conversationId];
        const { emitter, targets: msgTargets } = messages[messages.length - 1];
        const targets = [emitter, ...msgTargets].filter((id) => id !== info._id);
        const lastSeen = info.conversationsSeen?.[conversationId];
        dispatch(ensureConversation(conversationId, targets, new Date().toISOString()));
        dispatch(updateConversation(conversationId, targets, lastSeen, messages));
      }
    });
  };
});
