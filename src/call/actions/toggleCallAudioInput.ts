import { TOGGLE_CALL_AUDIO_INPUT, IToggleCallAudioInputAction } from '../types';

export function toggleCallAudioInput(): IToggleCallAudioInputAction {
  return { type: TOGGLE_CALL_AUDIO_INPUT };
}
