import { IRealtimeStateStatus, IUpdateRealtimeStatusAction, UPDATE_REALTIME_STATUS } from '../types';

export function updateRealtimeStatus(status: IRealtimeStateStatus): IUpdateRealtimeStatusAction {
  return {
    type: UPDATE_REALTIME_STATUS,
    status,
  };
}
