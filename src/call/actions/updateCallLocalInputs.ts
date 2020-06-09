import { IUpdateCallLocalInputsAction, UPDATE_CALL_LOCAL_INPUTS, ILocalInputs } from '../types';

export function updateCallLocalInputs(localInputs?: ILocalInputs): IUpdateCallLocalInputsAction {
  return {
    type: UPDATE_CALL_LOCAL_INPUTS,
    localInputs,
  };
}
