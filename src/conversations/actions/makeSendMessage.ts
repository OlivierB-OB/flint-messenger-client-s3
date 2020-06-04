import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateMessageEdition } from './updateMessageEdition';
import { updateConversationStatus } from './updateConversationStatus';
import { makeUpdateConversation } from './makeUpdateConversation';

export function makeSendMessage(conversationId: string) {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { conversations } = getState();
    const { messageEdition } = conversations;
    
    if (!messageEdition) return; // abort

    batch(() => {
      dispatch(updateMessageEdition(''));
      dispatch(updateConversationStatus('sending'));
    });

    try {
      const conversation = conversations.conversations.find(({ _id }) => _id === conversationId);
      if (!conversation) throw Error('Unable to send');
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/messages`, {
        conversationId,
        target: conversation.target,
        content: messageEdition,
      }, { withCredentials: true });
      batch(() => {
        dispatch(makeUpdateConversation([response.data]));
        dispatch(updateConversationStatus('ready'));
      })
    } catch (error) {
      dispatch(updateConversationStatus('error'));
    }
  };
}
