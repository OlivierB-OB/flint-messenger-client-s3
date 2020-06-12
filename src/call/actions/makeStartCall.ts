import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { makeCallModeEnter } from './makeCallModeEnter';
import { makeCallPeeringInitiate } from './makeCallPeeringInitiate';

export const makeStartCall = action((conversationId: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    const conversation = getState().conversations.conversations.find(({ _id }) => _id === conversationId);
    if (!conversation) throw Error('Conversation not found');

    const { targets } = conversation;

    // Start call mode
    dispatch(makeCallModeEnter(conversationId, targets));

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));
    
    // Initial call peerings
    for (const target of targets) {
      dispatch(makeCallPeeringInitiate(conversationId, target, 'call', true));
    }
  };
});
