import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { assertValidConversationId } from '../utils';
import { makeCallModeEnter } from './makeCallModeEnter';
import { makeCallPeeringAccept } from './makeCallPeeringAccept';

export const makeAcceptCall = action((conversationId: string, target: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    assertValidConversationId(getState(), conversationId);

    // start call mode
    dispatch(makeCallModeEnter(conversationId, [target]));

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));

    dispatch(makeCallPeeringAccept(conversationId, target, 'call'));
  };
});
