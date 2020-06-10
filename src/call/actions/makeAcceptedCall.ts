import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateCallRemoteStream } from './updateCallRemoteStream';
import { makeEmit } from '../../realtime/actions/makeEmit';

export const makeAcceptedCall = action((
  conversationId: string,
  target: string,
  offer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    console.log('======================================== START ACCEPTED')

    // FIXME check conversation id
    // FIXME retieve peerconnexion
    console.log(`conversation id: ${conversationId}`);

    // Accept remote answer
    const { peerConnection } = getState().call;
    if (!peerConnection) throw Error('No peer connexion available');

    console.log('================KOALA')

    console.log('================peerConnection.setRemoteDescription')
    // peerConnection.ontrack = function ({ streams }) {
    //   console.log('================peerConnection.ontrack')
    //   console.log(`Strem length ${streams.length}`)
    //   dispatch(updateCallRemoteStream(streams[0]));
    // };
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    // await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

    // Answer to received offer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    // await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    // FIXME emit call-accepted
    console.log('======================================== emiit call-established')
    dispatch(makeEmit('call-established', { conversationId, target, answer: peerConnection.localDescription }));

    console.log(peerConnection.connectionState);

    console.log('======================================== END ACCEPTED')
  };
});
