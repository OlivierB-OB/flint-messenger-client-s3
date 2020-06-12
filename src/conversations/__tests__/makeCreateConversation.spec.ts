import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeCreateConversation } from '../actions/makeCreateConversation';
import { IAxiosMock, mockAxios } from '../../utils/__mocks__';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeCreateConversation', () => {
  let axiosMock: IAxiosMock;

  beforeEach(() => {
    axiosMock = mockAxios();
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should create a new fresh conversation with the target and navigate to it', async () => {
    const store = mockStore({
      identity: {
        info: {
          _id: 'user id',
        },
      },
    });

    store.dispatch(makeCreateConversation('target id') as any);

    expect(store.getActions()).toEqual([
      {
        drawerContent: 'conversations',
        type: 'UPDATE_DRAWER_CONTENT',
      },
      {
        conversationId: expect.any(String),
        targets: ['target id'],
        type: 'CREATE_CONVERSATION',
      },
    ]);
    store.clearActions();
  });

  it('should crash if identity is unavailable', async () => {
    const store = mockStore({
      identity: {},
    });

    expect(store.dispatch(makeCreateConversation('target id') as any)).rejects.toEqual(Error('profile unavailable'));
  });
});
