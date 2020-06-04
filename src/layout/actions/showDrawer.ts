import { IToggleDrawerAction, TOGGLE_DRAWER } from '../types';

export function showDrawer(): IToggleDrawerAction {
  return {
    type: TOGGLE_DRAWER,
    showDrawer: true,
  };
}
