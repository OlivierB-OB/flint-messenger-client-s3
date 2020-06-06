import { IUsersState, IUpdateUserInfoAction } from '../types';
import { userComparator } from './utils/userComparator';

export function updateUserInfoCase(state: IUsersState, { data }: IUpdateUserInfoAction): IUsersState {
  const updated = data.map(({ _id }) => _id);
  const newState = {
    ...state,
    list: [...state.list.filter(({ _id }) => !updated.includes(_id)), ...data],
  };
  newState.list.sort(userComparator);
  return newState;
}
