import { ILoginState, ILoginUpdateStatusAction } from '../types';

export function updateLoginStatusCase(state: ILoginState, { status }: ILoginUpdateStatusAction): ILoginState {
  return { ...state, status };
}
