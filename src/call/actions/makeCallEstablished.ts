import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { assertValidConversationId, assertExistingPeerConnexion } from '../utils';

export const makeCallEstablished = action((
  conversationId: string,
  target: string,
  answer: RTCSessionDescriptionInit,
) => {
  return async (_: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START ESTABLISHED')
    const appState = getState();
    assertValidConversationId(appState, conversationId);
    const peerConnection = assertExistingPeerConnexion(appState, target);

    // Accept the received RTC peer connexion answer
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('======================================== END ESTABLISHED')
  };
});
