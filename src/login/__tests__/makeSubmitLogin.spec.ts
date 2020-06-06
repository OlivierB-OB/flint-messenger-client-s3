import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { IAxiosMock, mockAxios, getDeffered, sleep, IHistoryMock, mockHistory } from '../../utils/__mocks__';
import { makeSubmitLogin } from '../actions/makeSubmitLogin';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeSubmitLogin', () => {
  let axiosMock: IAxiosMock;
  let historyMock: IHistoryMock;
  let spyInitialize: jest.Mock;
  let restoreInitialize: () => void;

  beforeEach(() => {
    axiosMock = mockAxios();
    historyMock = mockHistory();
    [spyInitialize, restoreInitialize] = makeInitializeApplication.mock(jest.fn());
  });

  afterEach(() => {
    axiosMock.restore();
    historyMock.restore();
    restoreInitialize();
  });

  it('should submit the login then start the application and redirect to the profile', async () => {
    const [postLogin, resolvePostLogin] = await getDeffered();

    const store = mockStore({
      login: {
        form: {
          email: 'foo@test.com',
          password: 'baz',
        }
      }
    });

    axiosMock.post.mockReturnValueOnce(postLogin);
    store.dispatch(makeSubmitLogin() as any);

    expect(axiosMock.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND}/login`, {
      username: 'foo@test.com',
      password: 'baz',
    }, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'LOGIN_UPDATE_STATUS',
      },
    ]);
    store.clearActions();

    resolvePostLogin({ data: 'user profile'});

    await sleep(10);

    expect(store.getActions()).toEqual([]);
    store.clearActions();

    expect(spyInitialize).toHaveBeenCalledWith('user profile');
    expect(historyMock.push).toHaveBeenCalledWith('/profile');
  });

  it('should set the status in error if unable to login', async () => {
    const [postLogin, , rejectPostLogin] = await getDeffered();

    const store = mockStore({
      login: {
        form: {
          email: 'foo@test.com',
          password: 'baz',
        }
      }
    });

    axiosMock.post.mockReturnValueOnce(postLogin);
    store.dispatch(makeSubmitLogin() as any);

    expect(axiosMock.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACKEND}/login`, {
      username: 'foo@test.com',
      password: 'baz',
    }, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'LOGIN_UPDATE_STATUS',
      },
    ]);
    store.clearActions();

    rejectPostLogin(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'error',
        type: 'LOGIN_UPDATE_STATUS',
      },
    ]);
    store.clearActions();

    expect(spyInitialize).not.toHaveBeenCalled();
    expect(historyMock.push).not.toHaveBeenCalled();
  });
});
