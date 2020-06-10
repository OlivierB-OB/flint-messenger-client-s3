import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { makeEmit } from '../../realtime/actions/makeEmit';

export const makeAcceptedCall = action((
  conversationId: string,
  target: string,
  answer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    console.log('======================================== START ACCEPTED')

    // FIXME check conversation id
    // FIXME retieve peerconnexion
    console.log(`conversation id: ${conversationId}`);

    // Accept remote answer
    const { peerConnection } = getState().call;
    if (!peerConnection) throw Error('No peer connexion available');



    peerConnection.onicecandidate = function (event) {
      if (event.candidate) {
        console.log('======================================== emiit call-ice-candidate')
        dispatch(makeEmit('call-ice-candidate', { conversationId, target, candidate: event.candidate }));
      }
    }; 

    console.log('================KOALA')

    console.log('================peerConnection.setRemoteDescription')
    // peerConnection.ontrack = function ({ streams }) {
    //   console.log('================peerConnection.ontrack')
    //   console.log(`Strem length ${streams.length}`)
    //   dispatch(updateCallRemoteStream(streams[0]));
    // };
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    // await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

    console.log(peerConnection.connectionState);

    console.log('======================================== END ACCEPTED')
  };
});
