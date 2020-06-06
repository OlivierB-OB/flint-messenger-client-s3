import { ILayoutResetAction, LAYOUT_RESET } from '../types';

export function layoutReset(): ILayoutResetAction {
  return { type: LAYOUT_RESET };
}
