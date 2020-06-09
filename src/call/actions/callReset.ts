import { ICallResetAction, CALL_RESET } from '../types';

export function callReset(): ICallResetAction {
  return { type: CALL_RESET };
}
