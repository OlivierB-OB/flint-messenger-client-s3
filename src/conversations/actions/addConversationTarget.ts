import { IAddConversationTargetAction, ADD_CONVERSATION_TARGET } from '../types';

export function addConversationTarget(conversationId: string, target: string): IAddConversationTargetAction {
  return {
    type: ADD_CONVERSATION_TARGET,
    conversationId,
    target,
  };
}
