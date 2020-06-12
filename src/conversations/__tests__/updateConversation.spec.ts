import { conversations } from '../reducer';
import { updateConversation } from '../actions/updateConversation';
import { defaultConversationsState } from '../utils';

describe('updateConversation', () => {
  it('should allow adding new message to a conversation', async () => {
    expect(
      conversations(
        {
          ...defaultConversationsState(),
          conversations: [
            {
              _id: '123',
              targets: ['targetA'],
              messages: [],
              unseenMessages: 0,
              updatedAt: '2020-06-06T12:00:00.000Z',
            },
            {
              _id: '124',
              targets: ['targetB'],
              messages: [],
              unseenMessages: 0,
              updatedAt: '2020-06-06T00:00:00.000Z',
            },
          ],
          unseenMessages: 0,
        },
        updateConversation('124', ['targetB', 'target C'], '2020-06-06T13:00:00.000Z', [
          {
            _id: 'x',
            conversationId: '124',
            emitter: 'targetB',
            targets: ['myId', 'target C'],
            content: 'Hello',
            createdAt: '2020-06-06T15:00:00.000Z',
          },
        ]),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      conversations: [
        {
          _id: '124',
          targets: ['targetB', 'target C'],
          messages: [
            {
              _id: 'x',
              conversationId: '124',
              emitter: 'targetB',
              targets: ['myId', 'target C'],
              content: 'Hello',
              createdAt: '2020-06-06T15:00:00.000Z',
            },
          ],
          unseenMessages: 1,
          updatedAt: '2020-06-06T15:00:00.000Z',
        },
        {
          _id: '123',
          targets: ['targetA'],
          messages: [],
          unseenMessages: 0,
          updatedAt: '2020-06-06T12:00:00.000Z',
        },
      ],
      unseenMessages: 1,
    });
  });
});
