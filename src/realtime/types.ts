export type IRealtimeStateStatus = 'unavailable' | 'ready';

export interface IRealtimeState {
  status: IRealtimeStateStatus;
  socket?: SocketIOClient.Socket;
}

export const REALTIME_RESET = 'REALTIME_RESET';
export const UPDATE_REALTIME_STATUS = 'UPDATE_REALTIME_STATUS';
export const UPDATE_REALTIME_SOCKET = 'UPDATE_REALTIME_SOCKET';

export interface IRealtimeResetAction {
  type: typeof REALTIME_RESET;
}

export interface IUpdateRealtimeStatusAction {
  type: typeof UPDATE_REALTIME_STATUS;
  status: IRealtimeStateStatus;
}

export interface IUpdateRealtimeSocketAction {
  type: typeof UPDATE_REALTIME_SOCKET;
  socket: SocketIOClient.Socket;
}

export type IRealtimeAction = IRealtimeResetAction | IUpdateRealtimeStatusAction | IUpdateRealtimeSocketAction;
