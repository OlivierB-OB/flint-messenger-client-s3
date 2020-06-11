import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeFetchIdentity } from '../actions/makeFetchIdentity';
import { makeInitializeApplication } from '../../layout/actions/makeInitializeApplication';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeFetchIdentity', () => {
  let axiosMock: IAxiosMock;
  let spyInitialize: jest.Mock;
  let restoreInitialize: () => void;
  let spyExit: jest.Mock;
  let restoreExit: () => void;

  beforeEach(() => {
    axiosMock = mockAxios();
    [spyInitialize, restoreInitialize] = makeInitializeApplication.mock(jest.fn());
    [spyExit, restoreExit] = makeExitApplication.mock(jest.fn());
  });

  afterEach(() => {
    axiosMock.restore();
    restoreInitialize();
    restoreExit();
  });

  it('should fetch user identity then initialize application', async () => {
    const [getIdentity, resolveGetIdentity] = await getDeffered();

    const store = mockStore({});

    axiosMock.get.mockReturnValueOnce(getIdentity);
    store.dispatch(makeFetchIdentity() as any);

    expect(axiosMock.get).toHaveBeenCalledWith(`${api_backend_url}/profile`, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_IDENTITY_STATUS',
      },
    ]);
    store.clearActions();

    const profile = {
      _id: '1234',
      email: 'any.user@test.com',
      firstName: 'any',
      lastName: 'user',
      status: 'available',
    };
    resolveGetIdentity({ data: profile });

    await sleep(10);

    expect(spyInitialize).toHaveBeenCalledWith(profile);
    expect(spyExit).not.toHaveBeenCalled();
  });

  it('should exit application if unable to fetch user identity', async () => {
    const [getIdentity, , rejectGetIdentity] = await getDeffered();

    const store = mockStore({});

    axiosMock.get.mockReturnValueOnce(getIdentity);
    store.dispatch(makeFetchIdentity() as any);

    expect(axiosMock.get).toHaveBeenCalledWith(`${api_backend_url}/profile`, { withCredentials: true });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_IDENTITY_STATUS',
      },
    ]);
    store.clearActions();

    rejectGetIdentity(Error('any reason'));

    await sleep(10);

    expect(spyInitialize).not.toHaveBeenCalled();
    expect(spyExit).toHaveBeenCalled();
  });
});
