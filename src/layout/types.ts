
export type IDrawerContent = 'contacts' | 'conversations';

export interface ILayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
}

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const UPDATE_DRAWER_CONTENT = 'UPDATE_DRAWER_CONTENT';

export interface IToggleDrawerAction {
  type: typeof TOGGLE_DRAWER;
  showDrawer: boolean;
}

export interface IUpdateDrawerContentAction {
  type: typeof UPDATE_DRAWER_CONTENT;
  drawerContent: IDrawerContent;
}

export type ILayoutAction =
  | IToggleDrawerAction
  | IUpdateDrawerContentAction;
