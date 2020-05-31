import { IUsersState, IUpdateUserInfoAction } from '../types';

export function updateUserInfoCase(state: IUsersState, { data }: IUpdateUserInfoAction): IUsersState {
  const newState = {
    ...state,
    list: [
      ...state.list.filter((user) => user.uid !== data.uid),
      { ...data },
    ],
  };
  return newState;
}
