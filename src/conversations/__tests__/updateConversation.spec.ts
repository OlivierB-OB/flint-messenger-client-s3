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
              target: 'targetA',
              messages: [],
              unseenMessages: 0,
              updatedAt: '2020-06-06T12:00:00.000Z',
            },
            {
              _id: '124',
              target: 'targetB',
              messages: [],
              unseenMessages: 0,
              updatedAt: '2020-06-06T00:00:00.000Z',
            },
          ],
          unseenMessages: 0,
        },
        updateConversation('124', 'not used', '2020-06-06T13:00:00.000Z', [
          {
            _id: 'x',
            conversationId: '124',
            emitter: 'targetB',
            target: 'myId',
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
    });
  });

  it('should allow create a new conversation id necessary', async () => {
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
        updateConversation('124', 'targetB', '2020-06-06T13:00:00.000Z', [
          {
            _id: 'x',
            conversationId: '124',
            emitter: 'targetB',
            target: 'myId',
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
    });
  });

  it('should support unseen conversations', async () => {
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
        updateConversation('123', 'not used', undefined, [
          {
            _id: 'x',
            conversationId: '123',
            emitter: 'targetA',
            target: 'myId',
            content: 'Hello',
            createdAt: '2020-06-06T15:00:00.000Z',
          },
          {
            _id: 'y',
            conversationId: '123',
            emitter: 'targetA',
            target: 'myId',
            content: 'World',
            createdAt: '2020-06-06T15:00:01.000Z',
          },
        ]),
      ),
    ).toEqual({
      ...defaultConversationsState(),
      conversations: [
        {
          _id: '123',
          target: 'targetA',
          messages: [
            {
              _id: 'x',
              conversationId: '123',
              emitter: 'targetA',
              target: 'myId',
              content: 'Hello',
              createdAt: '2020-06-06T15:00:00.000Z',
            },
            {
              _id: 'y',
              conversationId: '123',
              emitter: 'targetA',
              target: 'myId',
              content: 'World',
              createdAt: '2020-06-06T15:00:01.000Z',
            },
          ],
          unseenMessages: 2,
          updatedAt: '2020-06-06T15:00:01.000Z',
        },
      ],
      unseenMessages: 2,
    });
  });
});
