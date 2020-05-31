export type IServiceStatus = 'unavailable' | 'ready' | 'success' | 'error';

export interface IServiceState<T extends IServiceStatus = IServiceStatus> {
  status: T;
}
