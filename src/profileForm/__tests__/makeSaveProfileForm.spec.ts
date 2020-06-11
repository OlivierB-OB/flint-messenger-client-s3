import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IAxiosMock, mockAxios, getDeffered, sleep } from '../../utils/__mocks__';
import { makeSaveProfileForm } from '../actions/makeSaveProfileForm';
import { config } from '../../config';

const { api_backend_url } = config;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('makeSaveProfileForm', () => {
  let axiosMock: IAxiosMock;

  beforeEach(() => {
    axiosMock = mockAxios();
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('should save the profile then provide a success feedback', async () => {
    const [patchProfile, resolvePatchProfile] = await getDeffered();

    const store = mockStore({
      profileForm: {
        fields: {
          firstName: {
            value: 'foo',
          },
          lastName: {
            value: 'bar',
          },
          password: {
            value: 'baz',
          },
        },
      },
    });

    axiosMock.patch.mockReturnValueOnce(patchProfile);
    store.dispatch(makeSaveProfileForm() as any);

    expect(axiosMock.patch).toHaveBeenCalledWith(
      `${api_backend_url}/profile`,
      {
        firstName: 'foo',
        lastName: 'bar',
        password: 'baz',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();

    resolvePatchProfile({ data: 'new updated profile' });

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        info: 'new updated profile',
        type: 'UPDATE_IDENTITY',
      },
      {
        status: 'success',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();
  });

  it('should not send the password if it has not been provided', async () => {
    const [patchProfile, resolvePatchProfile] = await getDeffered();

    const store = mockStore({
      profileForm: {
        fields: {
          firstName: {
            value: 'foo',
          },
          lastName: {
            value: 'bar',
          },
          password: {
            value: '',
          },
        },
      },
    });

    axiosMock.patch.mockReturnValueOnce(patchProfile);
    store.dispatch(makeSaveProfileForm() as any);

    expect(axiosMock.patch).toHaveBeenCalledWith(
      `${api_backend_url}/profile`,
      {
        firstName: 'foo',
        lastName: 'bar',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();

    resolvePatchProfile({ data: 'new updated profile' });

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        info: 'new updated profile',
        type: 'UPDATE_IDENTITY',
      },
      {
        status: 'success',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();
  });

  it('should set the status in error if unable to save the profile', async () => {
    const [patchProfile, , rejectPatchProfile] = await getDeffered();

    const store = mockStore({
      profileForm: {
        fields: {
          firstName: {
            value: 'foo',
          },
          lastName: {
            value: 'bar',
          },
          password: {
            value: 'baz',
          },
        },
      },
    });

    axiosMock.patch.mockReturnValueOnce(patchProfile);
    store.dispatch(makeSaveProfileForm() as any);

    expect(axiosMock.patch).toHaveBeenCalledWith(
      `${api_backend_url}/profile`,
      {
        firstName: 'foo',
        lastName: 'bar',
        password: 'baz',
      },
      { withCredentials: true },
    );

    expect(store.getActions()).toEqual([
      {
        status: 'unavailable',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();

    rejectPatchProfile(Error('any reason'));

    await sleep(10);

    expect(store.getActions()).toEqual([
      {
        status: 'error',
        type: 'UPDATE_PROFILE_FORM_STATUS',
      },
    ]);
    store.clearActions();
  });
});
