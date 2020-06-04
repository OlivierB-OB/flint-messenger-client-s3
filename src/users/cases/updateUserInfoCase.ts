import { IUsersState, IUpdateUserInfoAction } from '../types';

export function updateUserInfoCase(state: IUsersState, { data }: IUpdateUserInfoAction): IUsersState {
  const newState = {
    ...state,
    list: [
      ...state.list.filter((user) => user._id !== data._id),
      { ...data },
    ],
  };
  return newState;
}
