import { ICallState, IToggleCallVideoInputAction } from '../types';

export function toggleCallVideoInputCase(state: ICallState, _: IToggleCallVideoInputAction): ICallState {
  if (!state.inputs) return state;
  const localInputs = { ...state.inputs };
  if (!localInputs.video.isAvailable) return state;
  localInputs.video = (localInputs.video as any).toggle();
  return { ...state, inputs: localInputs };
}
