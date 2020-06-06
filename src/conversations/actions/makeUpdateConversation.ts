import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { IConversationMessage } from '../types';
import { updateConversation } from './updateConversation';

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
        const [{ emitter, target }] = messages;
        const conversationTarget = [emitter, target].find((id) => id !== info._id) as string;
        const lastSeen = info.conversationsSeen?.[conversationId];
        dispatch(updateConversation(conversationId, conversationTarget, lastSeen, messages));
      }
    });
  };
});
