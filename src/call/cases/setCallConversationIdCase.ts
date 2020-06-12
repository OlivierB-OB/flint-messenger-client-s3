import { ICallState, ISetCallConversationIdAction } from '../types';

export function setCallConversationIdCase(
  state: ICallState,
  { conversationId }: ISetCallConversationIdAction,
): ICallState {
  return { ...state, conversationId };
}
