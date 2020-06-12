import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import io from 'socket.io-client';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateRealtimeStatus } from './updateRealtimeStatus';
import { makeUpdateConversation } from '../../conversations/actions/makeUpdateConversation';
import { updateRealtimeSocket } from './updateRealtimeSocket';
import { realtimeReset } from './realtimeReset';
import { makeCallPeeringAnswerToOffer } from '../../call/actions/makeCallPeeringAnswerToOffer';
import { makeCallPeeringClosed } from '../../call/actions/makeCallPeeringClosed';
import { makeIncomingCall } from '../../call/actions/makeIncomingCall';
import { makeCallPeeringAddIceCandidate } from '../../call/actions/makeCallPeeringAddIceCandidate';
import { makeCallPeeringFinalized } from '../../call/actions/makeCallPeeringFinalized';
import { config } from '../../config';
import { makeUpdateUserInfo } from '../../users/actions/makeUpdateUserInfo';

export const makeStartRealtime = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateRealtimeStatus('unavailable'));

    const { socket_backend_url } = config;

    try {
      const socket = io.connect(socket_backend_url);
      socket.on('connect', () => {
        console.log(`receiving [connect] <-------`);
        dispatch(updateRealtimeSocket(socket));
        dispatch(updateRealtimeStatus('ready'));
      });

      socket.on('disconnect', () => {
        console.log(`receiving [disconnect] <-------`);
        dispatch(realtimeReset());
      });

      socket.on('user-update', (data: any) => {
        console.log(`receiving [user-update] <-------`);
        dispatch(makeUpdateUserInfo([data]));
      });
      
      socket.on('chat-message', (data: any) => {
        console.log(`receiving [chat-message] <-------`);
        dispatch(makeUpdateConversation([data]));
      });

      socket.on('call-peering-request', (data: any) => {
        console.log(`receiving [call-peering-request] <-------`);
        dispatch(makeIncomingCall(data.conversationId, data.emitter));
      });

      socket.on('call-peering-offer', (data: any) => {
        console.log(`receiving [call-peering-offer] <-------`);
        dispatch(makeCallPeeringAnswerToOffer(data.conversationId, data.emitter, data.offer));
      });

      socket.on('call-peering-answer', (data: any) => {
        console.log(`receiving [call-peering-answer] <-------`);
        dispatch(makeCallPeeringFinalized(data.conversationId, data.emitter, data.answer, data.requiredPeering));
      });

      socket.on('call-peering-ice-candidate', (data: any) => {
        console.log(`receiving [call-peering-ice-candidate] <-------`);
        dispatch(makeCallPeeringAddIceCandidate(data.conversationId, data.emitter, data.candidate));
      });
      
      socket.on('call-left', (data: any) => {
        console.log(`receiving [call-left] <-------`);
        dispatch(makeCallPeeringClosed(data.conversationId, data.emitter));
      });
    } catch (error) {
      dispatch(updateRealtimeStatus('unavailable'));
    }
  };
});
