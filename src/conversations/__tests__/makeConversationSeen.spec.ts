import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeConversationSeen } from '../actions/makeConversationSeen';
import { IAxiosMock, mockAxios, getDeffered, sleep, expectAnyDate } from '../../utils/__mocks__';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeConversationSeen', () => {
  let axiosMock: IAxiosMock;

  beforeEach(() => {
    axiosMock = mockAxios();
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should notify the server with the date and the conversation id', async () => {
    const [patchSeen, resolvePatchSeen] = await getDeffered();

    const store = mockStore({});

    axiosMock.patch.mockReturnValueOnce(patchSeen);
    store.dispatch(makeConversationSeen('123') as any);

    expect(axiosMock.patch).toHaveBeenCalledWith(
      `${api_backend_url}/profile/conversation-seen`,
      {
        conversationId: '123',
        seenDate: expectAnyDate(),
      },
      { withCredentials: true },
    );

    resolvePatchSeen({ data: 'the new user profile' });

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        info: 'the new user profile',
        type: 'UPDATE_IDENTITY',
      },
      {
        id: '123',
        seenDate: expectAnyDate(),
        type: 'CONVERSATION_SEEN',
      },
    ]);
    store.clearActions();
  });

  it('should ignore error', async () => {
    const [patchSeen, , rejectPatchSeen] = await getDeffered();

    const store = mockStore({});

    axiosMock.patch.mockReturnValueOnce(patchSeen);
    store.dispatch(makeConversationSeen('123') as any);

    expect(axiosMock.patch).toHaveBeenCalledWith(
      `${api_backend_url}/profile/conversation-seen`,
      {
        conversationId: '123',
        seenDate: expectAnyDate(),
      },
      { withCredentials: true },
    );

    rejectPatchSeen(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([]);
    store.clearActions();
  });
});
