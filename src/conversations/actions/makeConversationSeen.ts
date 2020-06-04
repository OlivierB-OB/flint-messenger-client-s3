import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { IConversationSeenAction, CONVERSATION_SEEN } from '../types';
import { updateIdentity } from '../../identity/actions/updateIdentity';

function conversationSeen(id: string, seenDate: string): IConversationSeenAction {
  return {
    type: CONVERSATION_SEEN,
    id,
    seenDate,
  };
}

export function makeConversationSeen(id: string) {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const seenDate = new Date().toISOString();
    
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/profile/conversation-seen`, {
        conversationId: id,
        seenDate,
      }, { withCredentials: true });
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(conversationSeen(id, seenDate));
      })
    } catch (error) {
      // IGNORE...
    }
  };
}
