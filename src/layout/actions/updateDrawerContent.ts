import { IUpdateDrawerContentAction, UPDATE_DRAWER_CONTENT, IDrawerContent } from '../types';

export function updateDrawerContent(drawerContent?: IDrawerContent): IUpdateDrawerContentAction {
  return {
    type: UPDATE_DRAWER_CONTENT,
    drawerContent,
  };
}
