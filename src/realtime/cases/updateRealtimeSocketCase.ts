import { IRealtimeState, IUpdateRealtimeSocketAction } from '../types';

export function updateRealtimeSocketCase(state: IRealtimeState, { socket }: IUpdateRealtimeSocketAction): IRealtimeState {
  return { ...state, socket };
}
