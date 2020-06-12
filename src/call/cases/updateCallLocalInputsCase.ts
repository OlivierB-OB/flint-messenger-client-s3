import { ICallState, IUpdateCallLocalInputsAction } from '../types';

export function updateCallLocalInputsCase(state: ICallState, { localInputs }: IUpdateCallLocalInputsAction): ICallState {
  return { ...state, inputs: localInputs };
}
