import { TOGGLE_CALL_VIDEO_INPUT, IToggleCallVideoInputAction } from '../types';

export function toggleCallVideoInput(): IToggleCallVideoInputAction {
  return { type: TOGGLE_CALL_VIDEO_INPUT };
}
