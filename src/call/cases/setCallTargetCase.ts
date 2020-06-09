import { ICallState, ISetCallTargetAction } from '../types';

export function setCallTargetCase(state: ICallState, { target }: ISetCallTargetAction): ICallState {
  return { ...state, target };
}
