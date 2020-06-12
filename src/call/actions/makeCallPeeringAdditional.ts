import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { assertValidConversationId } from '../utils';
import { makeCallPeeringInitiate } from './makeCallPeeringInitiate';
import { IPeeringPurpose } from '../types';

export const makeCallPeeringAdditional = action((
  conversationId: string,
  target: string,
  purpose: IPeeringPurpose,
  requiredPeering: string[],
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log(`========== makeCallPeeringAdditional: ${target} - ${purpose}`)
    assertValidConversationId(getState(), conversationId);
    
    requiredPeering.forEach((required) => dispatch(makeCallPeeringInitiate(conversationId, required, purpose, false)));
  };
});
