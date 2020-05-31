import { IUpdateMessageEditionAction, IConversationsState } from '../types';

export function updateMessageEditionCase(
  state: IConversationsState,
  { messageEdition }: IUpdateMessageEditionAction,
): IConversationsState {
  return { ...state, messageEdition };
}
