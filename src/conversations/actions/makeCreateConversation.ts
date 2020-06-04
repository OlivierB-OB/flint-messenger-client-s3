import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { hideUsersList } from '../../users/actions/hideUsersList';
import { ICreateConversationAction, CREATE_CONVERSATION } from '../types';

function createConversation(myId: string, targetId: string): ICreateConversationAction {
  return {
    type: CREATE_CONVERSATION,
    myId,
    targetId,
  };
}

export function makeCreateConversation(target: string) {
  return (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    dispatch(hideUsersList());
    if (info) dispatch(createConversation(info._id, target));
  };
}
