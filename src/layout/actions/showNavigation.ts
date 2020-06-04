import { IToggleNavigationAction, TOGGLE_NAVIGATION } from '../types';

export function showNavigation(): IToggleNavigationAction {
  return {
    type: TOGGLE_NAVIGATION,
    allowNavigation: true,
  };
}
