import { ILayoutState, IToggleDrawerAction } from '../types';

export function toggleDrawerCase(state: ILayoutState, { showDrawer }: IToggleDrawerAction): ILayoutState {
  return { ...state, showDrawer: showDrawer && !!state.drawerContent };
}
