import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { updateCallPeerConnection } from './updateCallPeerConnection';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { peerConnexionFactory, bindLocalInputToPeerConnexion, assertValidConversationId } from '../utils';
import { makeStartCallMode } from './makeStartCallMode';

export const makeAcceptCall = action((
  conversationId: string,
  target: string,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START ACCEPT');
    const appState = getState();
    assertValidConversationId(appState, conversationId);

    // start call mode
    dispatch(makeStartCallMode(conversationId, target));

    // Create peer connection
    const peerConnection = peerConnexionFactory(
      (candidate) => dispatch(makeEmit('call-ice-candidate', { conversationId, target, candidate })),
      (stream) => dispatch(updateCallRemoteStream(stream)),
    );
    dispatch(updateCallPeerConnection(peerConnection));

    // Create local media inputs
    const localInputs = await getLocalInputs();
    dispatch(updateCallLocalInputs(localInputs));
    bindLocalInputToPeerConnexion(peerConnection, localInputs);

    // Create an RTC peer connexion offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    dispatch(makeEmit('call-accepted', { conversationId, target, offer: peerConnection.localDescription }));
    console.log('======================================== END ACCEPT')
  };
});
