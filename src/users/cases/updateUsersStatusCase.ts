import { IUsersState, IUpdateUsersStatusAction } from '../types';

export function updateUsersStatusCase(state: IUsersState, { status }: IUpdateUsersStatusAction): IUsersState {
  return { ...state, status };
}
