import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeFetchConversations } from '../actions/makeFetchConversations';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';
import { makeUpdateConversation } from '../actions/makeUpdateConversation';
import { config } from '../../config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const { api_backend_url } = config;

describe('makeFetchConversations', () => {
  let axiosMock: IAxiosMock;
  let spyUpdateConversation: jest.Mock;
  let restoreUpdateConversation: () => void;

  beforeEach(() => {
    axiosMock = mockAxios();
    [spyUpdateConversation, restoreUpdateConversation] = makeUpdateConversation.mock(jest.fn());
  });

  afterEach(() => {
    axiosMock.restore();
    restoreUpdateConversation();
  });

  it('should fetch user conversation then initialize conversation service', async () => {
    const [getConversations, resolveGetConversations] = await getDeffered();

    const store = mockStore({});

    axiosMock.get.mockReturnValueOnce(getConversations);
    store.dispatch(makeFetchConversations() as any);

    expect(axiosMock.get).toHaveBeenCalledWith(`${api_backend_url}/messages`, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();

    resolveGetConversations({ data: 'the list of messages' });

    await sleep(10);

    expect(spyUpdateConversation).toHaveBeenCalledWith('the list of messages');
    expect(store.getActions()).toEqual([
      {
        status: 'ready',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();
  });

  it('should stay unavailable if unable to fetch conversations', async () => {
    const [getConversations, , rejectGetConversations] = await getDeffered();

    const store = mockStore({});

    axiosMock.get.mockReturnValueOnce(getConversations);
    store.dispatch(makeFetchConversations() as any);

    expect(axiosMock.get).toHaveBeenCalledWith(`${api_backend_url}/messages`, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();

    rejectGetConversations(Error('any reason'));

    await sleep(10);

    expect(spyUpdateConversation).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();
  });
});
