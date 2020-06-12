import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeFetchUsers } from '../actions/makeFetchUsers';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeFetchUsers', () => {
  let axiosMock: IAxiosMock;

  beforeEach(() => {
    axiosMock = mockAxios();
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should fetch users then initialize users cache / list', async () => {
    const [getUsers, resolveGetUsers] = await getDeffered();

    const store = mockStore({
      identity: { info: { _id: 'myId' } },
      users: { list: [] },
    });

    axiosMock.get.mockReturnValueOnce(getUsers);
    store.dispatch(makeFetchUsers() as any);

    expect(axiosMock.get).toHaveBeenCalledWith(`${api_backend_url}/users`, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_USERS_STATUS',
      },
    ]);
    store.clearActions();

    const users = [
      {
        _id: '1234',
        email: 'any.user@test.com',
        firstName: 'any',
        lastName: 'user',
        status: 'available',
      },
    ];
    resolveGetUsers({ data: users });

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'ready',
        type: 'UPDATE_USERS_STATUS',
      },
      {
        data: users,
        type: 'UPDATE_USER_INFO',
      },
    ]);
    store.clearActions();
  });

  it('should stay unavailable if unable to fetch users', async () => {
    const [getUsers, , rejectGetUsers] = await getDeffered();

    const store = mockStore({});

    axiosMock.get.mockReturnValueOnce(getUsers);
    store.dispatch(makeFetchUsers() as any);

    expect(axiosMock.get).toHaveBeenCalledWith(`${api_backend_url}/users`, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_USERS_STATUS',
      },
    ]);
    store.clearActions();

    rejectGetUsers(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_USERS_STATUS',
      },
    ]);
    store.clearActions();
  });
});
