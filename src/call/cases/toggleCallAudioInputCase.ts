import { ICallState, IToggleCallAudioInputAction } from '../types';

export function toggleCallAudioInputCase(state: ICallState, _: IToggleCallAudioInputAction): ICallState {
  if (!state.inputs) return state;
  const localInputs = { ...state.inputs };
  if (!localInputs.audio.isAvailable) return state;
  localInputs.audio = (localInputs.audio as any).toggle();
  return { ...state, inputs: localInputs };
}
