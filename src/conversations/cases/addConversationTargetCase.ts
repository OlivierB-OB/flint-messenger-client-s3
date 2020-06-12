import { IConversationsState, IAddConversationTargetAction, IConversation } from '../types';

export function addConversationTargetCase(
  state: IConversationsState,
  { conversationId, target }: IAddConversationTargetAction,
): IConversationsState {
  let conversation = state.conversations.find((c) => c._id === conversationId) as IConversation;
  conversation = {
    ...conversation,
    targets: [...new Set([...conversation.targets, target])],
  };
  return {
    ...state,
    conversations: [...state.conversations.filter((c) => c._id !== conversationId), conversation],
  };
}
