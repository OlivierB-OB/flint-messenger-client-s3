import { IToggleDrawerAction, TOGGLE_DRAWER } from '../types';

export function hideDrawer(): IToggleDrawerAction {
  return {
    type: TOGGLE_DRAWER,
    showDrawer: false,
  };
}
