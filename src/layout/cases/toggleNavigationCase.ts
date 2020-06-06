import { ILayoutState, IToggleNavigationAction } from '../types';

export function toggleNavigationCase(state: ILayoutState, { allowNavigation }: IToggleNavigationAction): ILayoutState {
  return { ...state, allowNavigation };
}
