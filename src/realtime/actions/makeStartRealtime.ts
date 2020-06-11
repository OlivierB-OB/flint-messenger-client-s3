import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import io from 'socket.io-client';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateRealtimeStatus } from './updateRealtimeStatus';
import { makeUpdateConversation } from '../../conversations/actions/makeUpdateConversation';
import { updateRealtimeSocket } from './updateRealtimeSocket';
import { realtimeReset } from './realtimeReset';
import { makeAcceptedCall } from '../../call/actions/makeAcceptedCall';
import { makeLeftCall } from '../../call/actions/makeLeftCall';
import { makeIncomingCall } from '../../call/actions/makeIncomingCall';
import { makeIceCandidate } from '../../call/actions/makeIceCandidate';
import { makeCallEstablished } from '../../call/actions/makeCallEstablished';
import { config } from '../../config';
import { makeUpdateUserInfo } from '../../users/actions/makeUpdateUserInfo';

export const makeStartRealtime = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateRealtimeStatus('unavailable'));

    const { socket_backend_url } = config;

    try {
      const socket = io.connect(socket_backend_url);
      socket.on('connect', function () {
        console.log(`receiving [connect] <-------`);
        dispatch(updateRealtimeSocket(socket));
        dispatch(updateRealtimeStatus('ready'));
      });

      socket.on('disconnect', function () {
        console.log(`receiving [disconnect] <-------`);
        dispatch(realtimeReset());
      });

      socket.on('user-update', function (data: any) {
        console.log(`receiving [user-update] <-------`);
        dispatch(makeUpdateUserInfo([data]));
      });
      
      socket.on('chat-message', function (data: any) {
        console.log(`receiving [chat-message] <-------`);
        dispatch(makeUpdateConversation([data]));
      });

      socket.on('call-request', function (data: any) {
        console.log(`receiving [call-request] <-------`);
        dispatch(makeIncomingCall(data.conversationId, data.emitter));
      });

      socket.on('call-accepted', function (data: any) {
        console.log(`receiving [call-accepted] <-------`);
        dispatch(makeAcceptedCall(data.conversationId, data.emitter, data.offer));
      });

      socket.on('call-established', function (data: any) {
        console.log(`receiving [call-established] <-------`);
        dispatch(makeCallEstablished(data.conversationId, data.emitter, data.answer));
      });
      
      socket.on('call-left', function (data: any) {
        console.log(`receiving [call-left] <-------`);
        dispatch(makeLeftCall(data.conversationId));
      });

      socket.on('call-ice-candidate', function (data: any) {
        console.log(`receiving [call-ice-candidate] <-------`);
        dispatch(makeIceCandidate(data.conversationId, data.emitter, data.candidate));
      });
    } catch (error) {
      dispatch(updateRealtimeStatus('unavailable'));
    }
  };
});
