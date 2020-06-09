import { ISetCallTargetAction, SET_CALL_TARGET } from '../types';

export function setCallTarget(target: string): ISetCallTargetAction {
  return {
    type: SET_CALL_TARGET,
    target,
  };
}
