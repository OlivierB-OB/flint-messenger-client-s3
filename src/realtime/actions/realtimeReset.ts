import { IRealtimeResetAction, REALTIME_RESET } from '../types';

export function realtimeReset(): IRealtimeResetAction {
  return { type: REALTIME_RESET };
}
