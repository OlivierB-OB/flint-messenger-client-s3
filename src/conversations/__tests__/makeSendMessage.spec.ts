import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';
import { makeSendMessage } from '../actions/makeSendMessage';
import { makeUpdateConversation } from '../actions/makeUpdateConversation';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeSendMessage', () => {
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

  it('should send the message then add it to the conversation content', async () => {
    const [postMessage, resolvePostMessage] = await getDeffered();

    const store = mockStore({
      conversations: {
        messageEdition: 'Hello',
        conversations: [
          {
            _id: '123',
            target: 'target id',
          },
        ],
      },
    });

    axiosMock.post.mockReturnValueOnce(postMessage);
    store.dispatch(makeSendMessage('123') as any);

    expect(axiosMock.post).toHaveBeenCalledWith(
      `${api_backend_url}/messages`,
      {
        conversationId: '123',
        target: 'target id',
        content: 'Hello',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        messageEdition: '',
        type: 'UPDATE_MESSAGE_EDITION',
      },
      {
        status: 'sending',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();

    resolvePostMessage({ data: 'the message' });

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'ready',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();
    expect(spyUpdateConversation).toHaveBeenCalledWith(['the message']);
  });

  it('should ignore the command if no edition pending', async () => {
    const [postMessage] = await getDeffered();

    const store = mockStore({
      conversations: {},
    });

    axiosMock.post.mockReturnValueOnce(postMessage);
    store.dispatch(makeSendMessage('123') as any);

    expect(store.getActions()).toEqual([]);
    store.clearActions();
    expect(axiosMock.patch).not.toHaveBeenCalled();
  });

  it('should set the status in error if unable to send', async () => {
    const [postMessage, , rejectPostMessage] = await getDeffered();

    const store = mockStore({
      conversations: {
        messageEdition: 'Hello',
        conversations: [
          {
            _id: '123',
            target: 'target id',
          },
        ],
      },
    });

    axiosMock.post.mockReturnValueOnce(postMessage);
    store.dispatch(makeSendMessage('123') as any);

    expect(axiosMock.post).toHaveBeenCalledWith(
      `${api_backend_url}/messages`,
      {
        conversationId: '123',
        target: 'target id',
        content: 'Hello',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        messageEdition: '',
        type: 'UPDATE_MESSAGE_EDITION',
      },
      {
        status: 'sending',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();

    rejectPostMessage(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'error',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();
  });

  it('should set the status in error if the specified conversation is not found', async () => {
    const [postMessage] = await getDeffered();

    const store = mockStore({
      conversations: {
        messageEdition: 'Hello',
        conversations: [],
      },
    });

    axiosMock.post.mockReturnValueOnce(postMessage);
    store.dispatch(makeSendMessage('123') as any);

    expect(axiosMock.post).not.toHaveBeenCalled();

    expect(store.getActions()).toEqual([
      {
        messageEdition: '',
        type: 'UPDATE_MESSAGE_EDITION',
      },
      {
        status: 'sending',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
      {
        status: 'error',
        type: 'UPDATE_CONVERSATION_STATUS',
      },
    ]);
    store.clearActions();
  });
});
