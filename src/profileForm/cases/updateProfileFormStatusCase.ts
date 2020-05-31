import { IProfileFormState, IUpdateProfileFormStatusAction } from '../types';

export function updateProfileFormStatusCase(
  state: IProfileFormState,
  { status }: IUpdateProfileFormStatusAction,
): IProfileFormState {
  return { ...state, status };
}
