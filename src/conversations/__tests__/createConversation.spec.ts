import { conversations } from '../reducer';
import { createConversation } from '../actions/createConversation';
import { defaultConversationsState } from '../utils';
import { expectAnyDate } from '../../utils/__mocks__';

describe('createConversation', () => {
  it('should allow conversation a new fresh conversation', async () => {
    expect(
      conversations(
        {
          ...defaultConversationsState(),
        },
        createConversation('123', 'targetA'),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      conversations: [
        {
          _id: '123',
          target: 'targetA',
          messages: [],
          unseenMessages: 0,
          updatedAt: expectAnyDate(),
        },
      ],
      unseenMessages: 0,
    });
  });
});
