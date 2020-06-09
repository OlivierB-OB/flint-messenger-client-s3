import { IRealtimeState } from '../types';

export function defaultRealtimeState(): IRealtimeState {
  return {
    status: 'unavailable',
  };
}
