import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';

export const makeCallEstablished = action((
  conversationId: string,
  target: string,
  answer: RTCSessionDescriptionInit,
) => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {

    console.log('======================================== START ESTABLISHED')

    // FIXME check conversation id
    // FIXME retieve peerconnexion
    console.log(`conversation id: ${conversationId}`);

    // Accept remote answer
    const { peerConnection } = getState().call;
    if (!peerConnection) throw Error('No peer connexion available');

    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    // await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

    console.log(peerConnection.connectionState);

    console.log('======================================== END ESTABLISHED')
  };
});
