import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';

export const makeAcceptedCall = action((
  conversationId: string,
  answer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    // FIXME check conversation id
    // FIXME retieve peerconnexion

    // Accept remote answer
    const { peerConnection } = getState().call;
    if (!peerConnection) throw Error('No peer connexion available');

    console.log('================peerConnection.setRemoteDescription')
    // peerConnection.ontrack = function ({ streams }) {
    //   console.log('================peerConnection.ontrack')
    //   console.log(`Strem length ${streams.length}`)
    //   dispatch(updateCallRemoteStream(streams[0]));
    // };
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };
});
