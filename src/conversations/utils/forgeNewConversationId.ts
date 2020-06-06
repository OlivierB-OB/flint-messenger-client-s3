export function forgeNewConversationId(myId: string, targetId: string): string {
  return Buffer.from([myId, targetId, new Date().toISOString()].join('_')).toString('base64');
}
