import axios from 'axios';
import { batch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateIdentity } from '../../identity/actions/updateIdentity';
import { conversationSeen } from './conversationSeen';

export const makeConversationSeen = action((id: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const seenDate = new Date().toISOString();

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND}/profile/conversation-seen`,
        {
          conversationId: id,
          seenDate,
        },
        { withCredentials: true },
      );
      batch(() => {
        dispatch(updateIdentity(response.data));
        dispatch(conversationSeen(id, seenDate));
      });
    } catch (error) {
      // IGNORE...
    }
  };
});
