import { ICallStateStatus, IUpdateCallStatusAction, UPDATE_CALL_STATUS } from '../types';

export function updateCallStatus(status: ICallStateStatus): IUpdateCallStatusAction {
  return {
    type: UPDATE_CALL_STATUS,
    status,
  };
}
