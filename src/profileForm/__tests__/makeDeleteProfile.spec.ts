import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { makeDeleteProfile } from '../actions/makeDeleteProfile';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeDeleteProfile', () => {
  let axiosMock: IAxiosMock;
  let spyExit: jest.Mock;
  let restoreExit: () => void;

  beforeEach(() => {
    axiosMock = mockAxios();
    [spyExit, restoreExit] = makeExitApplication.mock(jest.fn());
  });

  afterEach(() => {
    axiosMock.restore();
    restoreExit();
  });

  it('should delete user profile then exit application', async () => {
    const [deleteProfile, resolveDeleteProfile] = await getDeffered();

    const store = mockStore({});

    axiosMock.get.mockReturnValueOnce(deleteProfile);
    store.dispatch(makeDeleteProfile() as any);

    expect(axiosMock.delete).toHaveBeenCalledWith(`${api_backend_url}/profile`, {
      withCredentials: true,
    });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();

    resolveDeleteProfile(undefined);

    await sleep(10);

    expect(store.getActions()).toEqual([]);
    expect(spyExit).toHaveBeenCalled();
  });

  it('should set the status in error if unable to delete the profile', async () => {
    const [deleteProfile, , rejectDeleteProfile] = await getDeffered();

    const store = mockStore({});

    axiosMock.delete.mockReturnValueOnce(deleteProfile);
    store.dispatch(makeDeleteProfile() as any);

    expect(axiosMock.delete).toHaveBeenCalledWith(`${api_backend_url}/profile`, {
      withCredentials: true,
    });

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();

    rejectDeleteProfile(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'error',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    expect(spyExit).not.toHaveBeenCalled();
  });
});
