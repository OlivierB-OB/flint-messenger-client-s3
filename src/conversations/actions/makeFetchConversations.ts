import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateConversationStatus } from './updateConversationStatus';
import { makeUpdateConversation } from './makeUpdateConversation';
import { config } from '../../config';

const { api_backend_url } = config;

export const makeFetchConversations = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>) => {
    dispatch(updateConversationStatus('unavailable'));

    try {
      const response = await axios.get(`${api_backend_url}/messages`, { withCredentials: true });
      batch(() => {
        dispatch(updateConversationStatus('ready'));
        dispatch(makeUpdateConversation(response.data));
      });
    } catch (error) {
      dispatch(updateConversationStatus('unavailable'));
    }
  };
});
