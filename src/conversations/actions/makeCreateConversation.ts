import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../../appReducer';
import { updateDrawerContent } from '../../layout/actions/updateDrawerContent';
import { createConversation } from './createConversation';

export function makeCreateConversation(target: string) {
  return (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const { info } = getState().identity;
    dispatch(updateDrawerContent('conversations'));
    if (info) dispatch(createConversation(info._id, target));
  };
}
