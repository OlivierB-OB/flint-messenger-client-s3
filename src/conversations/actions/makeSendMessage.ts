import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateConversation } from './updateConversation';
import { updateMessageEdition } from './updateMessageEdition';
import { updateConversationStatus } from './updateConversationStatus';

export function makeSendMessage(conversationId: string) {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { conversations, identity } = getState();
    const { messageEdition } = conversations;
    
    if (!messageEdition) return; // abort

    batch(() => {
      dispatch(updateMessageEdition(''));
      dispatch(updateConversationStatus('sending'));
    });

    try {
      const { info } = identity;
      const conversation = conversations.conversations.find(({ _id }) => _id === conversationId);
      if (!info || !conversation) throw Error('Unable to send');
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/messages`, {
        conversationId,
        emitter: info._id,
        target: conversation.target,
        content: messageEdition,
      }, { withCredentials: true });
      batch(() => {
        dispatch(updateConversation(response.data));
        dispatch(updateConversationStatus('ready'));
      })
    } catch (error) {
      dispatch(updateConversationStatus('error'));
    }
  };
}
