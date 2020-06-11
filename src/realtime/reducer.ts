import { IRealtimeState, IRealtimeAction, REALTIME_RESET, UPDATE_REALTIME_STATUS, UPDATE_REALTIME_SOCKET } from './types';
import { updateRealtimeStatusCase } from './cases/updateRealtimeStatusCase';
import { defaultRealtimeState } from './utils/defaultRealtimeState';
import { updateRealtimeSocketCase } from './cases/updateRealtimeSocketCase';

export function realtime(state: IRealtimeState = defaultRealtimeState(), action: IRealtimeAction): IRealtimeState {
  switch (action.type) {
    case REALTIME_RESET:
      const { socket } = state;
      setImmediate(() => socket?.close());
      return defaultRealtimeState();
    case UPDATE_REALTIME_STATUS:
      return updateRealtimeStatusCase(state, action);
    case UPDATE_REALTIME_SOCKET:
      return updateRealtimeSocketCase(state, action);
    default:
      return state;
  }
}
