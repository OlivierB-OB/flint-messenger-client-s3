import { conversations } from '../reducer';
import { conversationSeen } from '../actions/conversationSeen';
import { defaultConversationsState } from '../utils';

describe('conversationSeen', () => {
  it('should allow a conversation as seen (removing unseen messages)', async () => {
    expect(
      conversations(
        {
          ...defaultConversationsState(),
          conversations: [
            {
              _id: '124',
              target: 'targetB',
              messages: [
                {
                  _id: 'x',
                  conversationId: '124',
                  emitter: 'targetB',
                  target: 'myId',
                  content: 'Hello',
                  createdAt: '2020-06-06T15:00:00.000Z',
                },
              ],
              unseenMessages: 1,
              updatedAt: '2020-06-06T15:00:00.000Z',
            },
            {
              _id: '123',
              target: 'targetA',
              messages: [],
              unseenMessages: 0,
              updatedAt: '2020-06-06T12:00:00.000Z',
            },
          ],
          unseenMessages: 1,
        },
        conversationSeen('124', '2020-06-20:00:00.000Z'),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      conversations: [
        {
          _id: '124',
          target: 'targetB',
          messages: [
            {
              _id: 'x',
              conversationId: '124',
              emitter: 'targetB',
              target: 'myId',
              content: 'Hello',
              createdAt: '2020-06-06T15:00:00.000Z',
            },
          ],
          unseenMessages: 0,
          updatedAt: '2020-06-06T15:00:00.000Z',
        },
        {
          _id: '123',
          target: 'targetA',
          messages: [],
          unseenMessages: 0,
          updatedAt: '2020-06-06T12:00:00.000Z',
        },
      ],
      unseenMessages: 0,
    });
  });

  it('should just ignore order if the conversation is not found', async () => {
    expect(
      conversations(
        {
          ...defaultConversationsState(),
          conversations: [
            {
              _id: '123',
              target: 'targetA',
              messages: [],
              unseenMessages: 0,
              updatedAt: '2020-06-06T12:00:00.000Z',
            },
          ],
          unseenMessages: 0,
        },
        conversationSeen('124', '2020-06-20:00:00.000Z'),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      conversations: [
        {
          _id: '123',
          target: 'targetA',
          messages: [],
          unseenMessages: 0,
          updatedAt: '2020-06-06T12:00:00.000Z',
        },
      ],
      unseenMessages: 0,
    });
  });
});
