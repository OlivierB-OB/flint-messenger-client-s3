import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateConversationStatus } from './updateConversationStatus';
import { updateConversation } from './updateConversation';

export function makeFetchConversations() {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateConversationStatus('unavailable'));

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/messages`, { withCredentials: true });
      batch(() => {
        dispatch(updateConversationStatus('ready'));
        for (const message of response.data) dispatch(updateConversation(message));
      });
    } catch (error) {
      dispatch(updateConversationStatus('unavailable'));
    }
  };
}
