import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallLocalInputs } from './updateCallLocalInputs';
import { getLocalInputs } from '../utils/getLocalInputs';
import { updateCallPeerConnection } from './updateCallPeerConnection';
import { makeEmit } from '../../realtime/actions/makeEmit';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { peerConnexionFactory, bindLocalInputToPeerConnexion } from '../utils';
import { makeStartCallMode } from './makeStartCallMode';

export const makeStartCall = action((conversationId: string) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    console.log('======================================== START STARTING');
    
    const conversation = getState().conversations.conversations.find(({ _id }) => _id === conversationId);
    if (!conversation) throw Error('Conversation not found');

    const { target } = conversation;

    // Start call mode
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

    // Emit call request
    dispatch(makeEmit('call-request', { conversationId, target }));
    console.log('======================================== END STARTING')
  };
});
