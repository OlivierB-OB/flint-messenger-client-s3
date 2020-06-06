import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateConversationStatus } from './updateConversationStatus';
import { makeUpdateConversation } from './makeUpdateConversation';

export const makeFetchConversations = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateConversationStatus('unavailable'));

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/messages`, { withCredentials: true });
      batch(() => {
        dispatch(updateConversationStatus('ready'));
        dispatch(makeUpdateConversation(response.data));
      });
    } catch (error) {
      dispatch(updateConversationStatus('unavailable'));
    }
  };
});
