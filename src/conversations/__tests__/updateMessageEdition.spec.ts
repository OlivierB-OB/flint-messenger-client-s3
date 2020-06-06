import { conversations } from '../reducer';
import { updateMessageEdition } from '../actions/updateMessageEdition';
import { defaultConversationsState } from '../utils';

describe('updateMessageEdition', () => {
  it('should allow updating the content of the message to be sent', async () => {
    expect(
      conversations(
        {
          ...defaultConversationsState(),
          messageEdition: 'old value',
        },
        updateMessageEdition('new value'),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      messageEdition: 'new value',
    });
  });
});
