import {
  ILayoutState,
  ILayoutAction,
  TOGGLE_DRAWER,
  UPDATE_DRAWER_CONTENT,
} from './types';
import { toggleDrawerCase } from './cases/toggleDrawerCase';
import { updateDrawerContentCase } from './cases/updateDrawerContentCase';

export function layout(
  state: ILayoutState = { showDrawer: false },
  action: ILayoutAction,
): ILayoutState {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return toggleDrawerCase(state, action);
    case UPDATE_DRAWER_CONTENT:
      return updateDrawerContentCase(state, action);
    default:
      return state;
  }
}
