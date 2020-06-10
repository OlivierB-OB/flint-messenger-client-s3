import { IAppState } from '../../appReducer';

export function assertValidConversationId(appState: IAppState, conversationId: string): void {
  const callConversationId = appState.call.conversationId;
  if (!callConversationId || callConversationId !== conversationId) throw Error('Invalid conversation id');
}
