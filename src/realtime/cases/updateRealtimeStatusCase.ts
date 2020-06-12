import { IRealtimeState, IUpdateRealtimeStatusAction } from '../types';

export function updateRealtimeStatusCase(
  state: IRealtimeState,
  { status }: IUpdateRealtimeStatusAction,
): IRealtimeState {
  return { ...state, status };
}
