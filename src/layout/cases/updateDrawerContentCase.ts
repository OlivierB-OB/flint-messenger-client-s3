import { ILayoutState, IUpdateDrawerContentAction } from '../types';

export function updateDrawerContentCase(
  state: ILayoutState,
  { drawerContent }: IUpdateDrawerContentAction,
): ILayoutState {
  const newState = { ...state, drawerContent };
  if (!newState.drawerContent) {
    delete newState.drawerContent;
    newState.showDrawer = false;
  }
  return newState;
}
