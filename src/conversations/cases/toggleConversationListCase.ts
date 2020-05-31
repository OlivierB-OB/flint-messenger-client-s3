import { IConversationsState, IToggleConversationListAction } from '../types';

export function toggleConversationListCase(
  state: IConversationsState,
  { value }: IToggleConversationListAction,
): IConversationsState {
  return { ...state, show: value };
}
