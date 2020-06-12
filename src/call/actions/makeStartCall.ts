import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { makeStartCallMode } from './makeStartCallMode';
import { makeCallPeeringInitiate } from './makeCallPeeringInitiate';

export const makeStartCall = action((conversationId: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START STARTING');
    
    const conversation = getState().conversations.conversations.find(({ _id }) => _id === conversationId);
    if (!conversation) throw Error('Conversation not found');

    const { targets } = conversation;

    // Start call mode
    dispatch(makeStartCallMode(conversationId, targets));

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));
    
    // Initial call peerings
    for (const target of targets) {
      dispatch(makeCallPeeringInitiate(conversationId, target, true));
    }
    console.log('======================================== END STARTING')
  };
});
