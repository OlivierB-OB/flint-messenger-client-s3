import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';

export const makeIceCandidate = action((
  conversationId: string,
  target: string,
  candidate: RTCIceCandidateInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    console.log('======================================== START ICE CANDIDATE')

    // FIXME check conversation id
    // FIXME retieve peerconnexion
    console.log(`conversation id: ${conversationId}`);

    // Accept remote answer
    const { peerConnection } = getState().call;
    if (!peerConnection) throw Error('No peer connexion available');

    peerConnection.addIceCandidate(new RTCIceCandidate(candidate)); 

    console.log(peerConnection.connectionState);

    console.log('======================================== END ICE CANDIDATE')
  };
});
