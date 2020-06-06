import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeUpdateConversation } from '../actions/makeUpdateConversation';
import { IAxiosMock, mockAxios } from '../../utils/__mocks__';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeUpdateConversation', () => {
  let axiosMock: IAxiosMock;

  beforeEach(() => {
    axiosMock = mockAxios();
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should update the conversation with the messages', async () => {
    const store = mockStore({
      identity: {
        info: {
          _id: 'user A',
        },
      },
    });

    store.dispatch(
      makeUpdateConversation([
        {
          conversationId: '1234',
          emitter: 'user B',
          target: 'user A',
        },
      ] as any) as any,
    );

    expect(store.getActions()).toEqual([
      {
        conversationId: '1234',
        conversationTarget: 'user B',
        lastSeen: undefined,
        messages: [
          {
            conversationId: '1234',
            emitter: 'user B',
            target: 'user A',
          },
        ],
        type: 'UPDATE_CONVERSATION',
      },
    ]);
    store.clearActions();
  });

  it('should update many conversations if needed', async () => {
    const store = mockStore({
      identity: {
        info: {
          _id: 'user A',
          conversationsSeen: {
            '4321': 'last seen value for 4321',
          },
        },
      },
    });

    store.dispatch(
      makeUpdateConversation([
        {
          conversationId: '1234',
          emitter: 'user B',
          target: 'user A',
        },
        {
          conversationId: '4321',
          emitter: 'user C',
          target: 'user A',
        },
      ] as any) as any,
    );

    expect(store.getActions()).toEqual([
      {
        conversationId: '1234',
        conversationTarget: 'user B',
        lastSeen: undefined,
        messages: [
          {
            conversationId: '1234',
            emitter: 'user B',
            target: 'user A',
          },
        ],
        type: 'UPDATE_CONVERSATION',
      },
      {
        conversationId: '4321',
        conversationTarget: 'user C',
        lastSeen: 'last seen value for 4321',
        messages: [
          {
            conversationId: '4321',
            emitter: 'user C',
            target: 'user A',
          },
        ],
        type: 'UPDATE_CONVERSATION',
      },
    ]);
    store.clearActions();
  });

  it('should crash if identity is unavailable', async () => {
    const store = mockStore({
      identity: {},
    });

    expect(store.dispatch(makeUpdateConversation([]) as any)).rejects.toEqual(Error('profile unavailable'));
  });
});
