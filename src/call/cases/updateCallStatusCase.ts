import { ICallState, IUpdateCallStatusAction } from '../types';

export function updateCallStatusCase(state: ICallState, { status }: IUpdateCallStatusAction): ICallState {
  return { ...state, status };
}
