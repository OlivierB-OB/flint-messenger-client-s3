import { IUsersState, IToggleUserListAction } from '../types';

export function toggleUserListCase(state: IUsersState, { data }: IToggleUserListAction): IUsersState {
  return { ...state, show: data };
}
