import { IUpdateRealtimeSocketAction, UPDATE_REALTIME_SOCKET } from '../types';

export function updateRealtimeSocket(socket: SocketIOClient.Socket): IUpdateRealtimeSocketAction {
  return {
    type: UPDATE_REALTIME_SOCKET,
    socket,
  };
}
