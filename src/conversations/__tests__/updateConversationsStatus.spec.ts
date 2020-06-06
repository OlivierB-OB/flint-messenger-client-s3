import { conversations } from '../reducer';
import { updateConversationStatus } from '../actions/updateConversationStatus';
import { defaultConversationsState } from '../utils';

describe('updateConversationStatus', () => {
  it('should allow updating converstaions status', async () => {
    expect(
      conversations(
        {
          ...defaultConversationsState(),
          status: 'unavailable',
        },
        updateConversationStatus('ready'),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      status: 'ready',
    });
  });
});
