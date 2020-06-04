import { IToggleNavigationAction, TOGGLE_NAVIGATION } from '../types';

export function hideNavigation(): IToggleNavigationAction {
  return {
    type: TOGGLE_NAVIGATION,
    allowNavigation: false,
  };
}
