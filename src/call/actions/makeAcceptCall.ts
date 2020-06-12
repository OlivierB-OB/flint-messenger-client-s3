import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { assertValidConversationId } from '../utils';
import { makeCallModeEnter } from './makeCallModeEnter';
import { makeCallPeeringCreateOffer } from './makeCallPeeringCreateOffer';

export const makeAcceptCall = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START ACCEPT');
    assertValidConversationId(getState(), conversationId);

    // start call mode
    dispatch(makeCallModeEnter(conversationId, [target]));

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));

    dispatch(makeCallPeeringCreateOffer(conversationId, target));
    console.log('======================================== END ACCEPT')
  };
});
