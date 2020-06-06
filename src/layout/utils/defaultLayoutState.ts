import { ILayoutState } from '../types';

export function defaultLayoutState(): ILayoutState {
  return {
    showDrawer: false,
    allowNavigation: false,
  };
}
