import { IConversationsState, IUpdateConversationStatusAction } from '../types';

export function updateConversationStatusCase(
  state: IConversationsState,
  { status }: IUpdateConversationStatusAction,
): IConversationsState {
  return { ...state, status };
}
