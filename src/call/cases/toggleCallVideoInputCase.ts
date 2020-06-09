import { ICallState, IToggleCallVideoInputAction } from '../types';

export function toggleCallVideoInputCase(state: ICallState, _: IToggleCallVideoInputAction): ICallState {
  if (!state.localInputs) return state;
  const localInputs = { ...(state.localInputs) };
  if (!localInputs.video.isAvailable) return state;
  localInputs.video = (localInputs.video as any).toggle();
  return { ...state, localInputs };
}
