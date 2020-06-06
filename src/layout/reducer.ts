import {
  ILayoutState,
  ILayoutAction,
  TOGGLE_DRAWER,
  UPDATE_DRAWER_CONTENT,
  TOGGLE_NAVIGATION,
  LAYOUT_RESET,
} from './types';
import { toggleDrawerCase } from './cases/toggleDrawerCase';
import { updateDrawerContentCase } from './cases/updateDrawerContentCase';
import { toggleNavigationCase } from './cases/toggleNavigationCase';
import { defaultLayoutState } from './utils';

export function layout(state: ILayoutState = defaultLayoutState(), action: ILayoutAction): ILayoutState {
  switch (action.type) {
    case LAYOUT_RESET:
      return defaultLayoutState();
    case TOGGLE_DRAWER:
      return toggleDrawerCase(state, action);
    case UPDATE_DRAWER_CONTENT:
      return updateDrawerContentCase(state, action);
    case TOGGLE_NAVIGATION:
      return toggleNavigationCase(state, action);
    default:
      return state;
  }
}
