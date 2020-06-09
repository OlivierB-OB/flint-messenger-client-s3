import { ICallState, IToggleCallAudioInputAction } from '../types';

export function toggleCallAudioInputCase(state: ICallState, _: IToggleCallAudioInputAction): ICallState {
  if (!state.localInputs) return state;
  const localInputs = { ...(state.localInputs) };
  if (!localInputs.audio.isAvailable) return state;
  localInputs.audio = (localInputs.audio as any).toggle();
  console.log('============================= Audio toggle');
  console.log(localInputs.audio.isActive);
  return { ...state, localInputs };
}
